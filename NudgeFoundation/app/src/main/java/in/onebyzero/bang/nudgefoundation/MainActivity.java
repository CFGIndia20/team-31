package in.onebyzero.bang.nudgefoundation;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    public void construct(View view) {
        Intent intent= new Intent(MainActivity.this,Interview.class).putExtra("name","Construction");
        startActivity(intent);
    }

    public void watch(View view) {
        Intent intent= new Intent(MainActivity.this,Interview.class).putExtra("name","Watchman");
        startActivity(intent);
    }
}