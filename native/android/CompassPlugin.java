package com.vird.aile;

import android.content.Context;
import android.hardware.GeomagneticField;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.view.Surface;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

/**
 * Vird pusulası: telefonun dönüş sensöründen gerçek kuzeye göre yön (0-360) verir.
 * Manyetik sapma, seçilen yerin koordinatlarıyla düzeltilir.
 */
@CapacitorPlugin(name = "Compass")
public class CompassPlugin extends Plugin implements SensorEventListener {
    private SensorManager sm;
    private Sensor rot;
    private float declination = 0f;
    private long last = 0;
    private int accuracy = 3;
    private boolean running = false;
    private Sensor acc, mag;
    private final float[] grav = new float[3];
    private final float[] geo = new float[3];
    private boolean hasGrav = false, hasGeo = false;
    private String mode = "yok";

    @Override
    public void load() {
        sm = (SensorManager) getContext().getSystemService(Context.SENSOR_SERVICE);
        if (sm != null) {
            rot = sm.getDefaultSensor(Sensor.TYPE_ROTATION_VECTOR);
            if (rot == null) rot = sm.getDefaultSensor(Sensor.TYPE_GEOMAGNETIC_ROTATION_VECTOR);
            acc = sm.getDefaultSensor(Sensor.TYPE_ACCELEROMETER);
            mag = sm.getDefaultSensor(Sensor.TYPE_MAGNETIC_FIELD);
            mode = rot != null ? "dondurme" : (acc != null && mag != null ? "manyetik" : "yok");
        }
    }

    @PluginMethod
    public void start(PluginCall call) {
        JSObject res = new JSObject();
        if (sm == null || mode.equals("yok")) {
            res.put("available", false);
            res.put("mode", mode);
            call.resolve(res);
            return;
        }
        Double lat = call.getDouble("lat", 0.0);
        Double lng = call.getDouble("lng", 0.0);
        GeomagneticField gf = new GeomagneticField(lat.floatValue(), lng.floatValue(), 0f, System.currentTimeMillis());
        declination = gf.getDeclination();
        sm.unregisterListener(this);
        register();
        running = true;
        res.put("available", true);
        res.put("mode", mode);
        res.put("declination", declination);
        call.resolve(res);
    }

    private void register() {
        if (rot != null) sm.registerListener(this, rot, SensorManager.SENSOR_DELAY_UI);
        else {
            hasGrav = false;
            hasGeo = false;
            sm.registerListener(this, acc, SensorManager.SENSOR_DELAY_UI);
            sm.registerListener(this, mag, SensorManager.SENSOR_DELAY_UI);
        }
    }

    @PluginMethod
    public void stop(PluginCall call) {
        running = false;
        if (sm != null) sm.unregisterListener(this);
        call.resolve();
    }

    @Override
    protected void handleOnPause() {
        if (sm != null) sm.unregisterListener(this);
    }

    @Override
    protected void handleOnResume() {
        if (running && sm != null && !mode.equals("yok")) register();
    }

    @Override
    public void onSensorChanged(SensorEvent event) {
        float[] r = new float[9];
        if (rot != null) {
            long now = System.currentTimeMillis();
            if (now - last < 50) return;
            last = now;
            SensorManager.getRotationMatrixFromVector(r, event.values);
        } else {
            if (event.sensor == acc) {
                for (int i = 0; i < 3; i++) grav[i] = hasGrav ? grav[i] * 0.85f + event.values[i] * 0.15f : event.values[i];
                hasGrav = true;
            } else if (event.sensor == mag) {
                for (int i = 0; i < 3; i++) geo[i] = hasGeo ? geo[i] * 0.85f + event.values[i] * 0.15f : event.values[i];
                hasGeo = true;
            }
            if (!hasGrav || !hasGeo) return;
            long now = System.currentTimeMillis();
            if (now - last < 50) return;
            last = now;
            if (!SensorManager.getRotationMatrix(r, null, grav, geo)) return;
        }
        float[] out = new float[9];
        float[] o = new float[3];
        int rotation = Surface.ROTATION_0;
        try {
            rotation = getActivity().getWindowManager().getDefaultDisplay().getRotation();
        } catch (Exception ignored) {
        }
        int ax = SensorManager.AXIS_X, ay = SensorManager.AXIS_Y;
        if (rotation == Surface.ROTATION_90) {
            ax = SensorManager.AXIS_Y;
            ay = SensorManager.AXIS_MINUS_X;
        } else if (rotation == Surface.ROTATION_180) {
            ax = SensorManager.AXIS_MINUS_X;
            ay = SensorManager.AXIS_MINUS_Y;
        } else if (rotation == Surface.ROTATION_270) {
            ax = SensorManager.AXIS_MINUS_Y;
            ay = SensorManager.AXIS_X;
        }
        SensorManager.remapCoordinateSystem(r, ax, ay, out);
        SensorManager.getOrientation(out, o);
        double az = Math.toDegrees(o[0]) + declination;
        az = ((az % 360) + 360) % 360;
        JSObject d = new JSObject();
        d.put("heading", az);
        d.put("accuracy", accuracy);
        notifyListeners("heading", d);
    }

    @Override
    public void onAccuracyChanged(Sensor sensor, int acc) {
        accuracy = acc;
    }
}
