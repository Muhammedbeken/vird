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

    @Override
    public void load() {
        sm = (SensorManager) getContext().getSystemService(Context.SENSOR_SERVICE);
        if (sm != null) {
            rot = sm.getDefaultSensor(Sensor.TYPE_ROTATION_VECTOR);
            if (rot == null) rot = sm.getDefaultSensor(Sensor.TYPE_GEOMAGNETIC_ROTATION_VECTOR);
        }
    }

    @PluginMethod
    public void start(PluginCall call) {
        JSObject res = new JSObject();
        if (sm == null || rot == null) {
            res.put("available", false);
            call.resolve(res);
            return;
        }
        Double lat = call.getDouble("lat", 0.0);
        Double lng = call.getDouble("lng", 0.0);
        GeomagneticField gf = new GeomagneticField(lat.floatValue(), lng.floatValue(), 0f, System.currentTimeMillis());
        declination = gf.getDeclination();
        sm.unregisterListener(this);
        sm.registerListener(this, rot, SensorManager.SENSOR_DELAY_UI);
        running = true;
        res.put("available", true);
        res.put("declination", declination);
        call.resolve(res);
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
        if (running && sm != null && rot != null) sm.registerListener(this, rot, SensorManager.SENSOR_DELAY_UI);
    }

    @Override
    public void onSensorChanged(SensorEvent event) {
        long now = System.currentTimeMillis();
        if (now - last < 50) return;
        last = now;
        float[] r = new float[9];
        float[] out = new float[9];
        float[] o = new float[3];
        SensorManager.getRotationMatrixFromVector(r, event.values);
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
