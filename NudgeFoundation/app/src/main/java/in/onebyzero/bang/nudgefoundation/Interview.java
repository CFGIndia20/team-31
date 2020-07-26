package in.onebyzero.bang.nudgefoundation;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.provider.MediaStore;
import android.view.View;
import android.widget.TextView;
import android.widget.VideoView;

import java.util.Random;

public class Interview extends AppCompatActivity {
 public VideoView videoView;
 public String[] Construction,Watchman;
 public TextView question_tv;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_interview);
        Intent intent=new Intent();
        Construction=new String[]{"What was the most complex construction project you’ve been involved with?","Do you have any experience, licenses, or certifications that would allow you to operate special equipment?",
        "How would you handle a rule violation or an accident? Support you answer with experience.","Do you think communication and comprehension are important in physical labor? Why or why not?","How do you begin each work day? How do you end it?"};
        Watchman=new String[]{"Describe a time when you used teamwork to solve a problem at a previous security job."," Tell me about a time you successfully dealt with an angry member of the public."," Describe a time when you felt as if you were in physical danger on the job. How did you handle the situation?","Imagine you have been called to handle an emergency on the 10th floor of a building, but six guests are waiting to be checked in at the front desk. It's late at night, and you are momentarily alone at the front desk. What would you do?","How comfortable are you using computers?"};
        String question=intent.getStringExtra("name");
        Random rand=new Random();
        int r=rand.nextInt(4);
        question_tv=findViewById(R.id.textView);
        if("Construction".equalsIgnoreCase(question) && (question != null)){
        question_tv.setText(Construction[r]);}
        else
            question_tv.setText(Watchman[r]);
        videoView=findViewById(R.id.videoView);

    }
    static final int REQUEST_VIDEO_CAPTURE = 1;

    public void captureVideo(View view) {
        Intent takeVideoIntent = new Intent(MediaStore.ACTION_VIDEO_CAPTURE);
        if (takeVideoIntent.resolveActivity(getPackageManager()) != null) {
            startActivityForResult(takeVideoIntent, REQUEST_VIDEO_CAPTURE);
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent intent) {
        super.onActivityResult(requestCode, resultCode, intent);
        if (requestCode == REQUEST_VIDEO_CAPTURE && resultCode == RESULT_OK) {
            Uri videoUri = intent.getData();
            videoView.setVideoURI(videoUri);
            videoView.start();
            videoView.canPause();
            videoView.canSeekBackward();
            videoView.canSeekForward();
        }
    }
}