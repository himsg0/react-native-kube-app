package com.kubecity;

import android.content.ComponentName;
import android.content.Intent;
import android.widget.Toast;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class RedirectionModule extends ReactContextBaseJavaModule {

    private static ReactApplicationContext reactContext;

    RedirectionModule(ReactApplicationContext context){
        super(context);
        reactContext = context;
    }

    @ReactMethod
    public void show(Promise promise){
        Toast.makeText(reactContext, "Hi, it's working", Toast.LENGTH_LONG).show();

        try {
            Intent intent = new Intent(Intent.ACTION_MAIN);
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            intent.setComponent(new ComponentName("com.localville.partner","com.localville.partner.MainActivity"));
            reactContext.startActivity(intent);
        }
        catch (Exception e){
            promise.reject("RedirectionModule Error", e);
        }
    }

    @NonNull
    @Override
    public String getName() {
        return "RedirectionModule";
    }
}
