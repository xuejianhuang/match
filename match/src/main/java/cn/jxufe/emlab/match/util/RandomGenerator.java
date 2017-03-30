package cn.jxufe.emlab.match.util;

import java.util.Random;

public class RandomGenerator
{
    private static String range = "0123456789abcdefghijklmnopqrstuvwxyz";

    public static synchronized String getRandomString(int num)
    {
        Random random = new Random();

        StringBuffer result = new StringBuffer();

        for ( int i = 0; i < num; i++ )
        {
            result.append( range.charAt( random.nextInt( range.length() ) ) );
        }

        return result.toString();
    }
}
