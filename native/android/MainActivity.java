package com.vird.aile;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(CompassPlugin.class);
        super.onCreate(savedInstanceState);
    }
}
