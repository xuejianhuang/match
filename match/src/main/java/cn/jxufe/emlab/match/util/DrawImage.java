package cn.jxufe.emlab.match.util;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.util.Random;

public class DrawImage
{

	public static String code;

	private static char[] codeSequence = { 'A', 'B', 'C', 'D', 'E', 'F', 'G',
			'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
			'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6',
			'7', '8', '9' };

	public static BufferedImage randomDrawImage(int width, int height,
			int codeCount)
	{
		int coord_X = width / (codeCount + 1);
		int fontHeight = height - 2;
		int coord_Y = height - 4;
		BufferedImage buffImg = new BufferedImage(width, height,
				BufferedImage.TYPE_INT_BGR);
		Graphics2D g = buffImg.createGraphics();

		Random random = new Random();
		g.setColor(Color.WHITE);
		g.fillRect(0, 0, width, height);

		Font font = new Font("Fixedsys", Font.PLAIN, fontHeight);
		g.setFont(font);

		g.setColor(Color.blue);
		g.drawRect(0, 0, width - 1, height - 1);

		g.setColor(Color.BLACK);
		for (int i = 0; i < 10; i++)
		{
			int x = random.nextInt(width);
			int y = random.nextInt(height);
			int xl = random.nextInt(12);
			int yl = random.nextInt(12);
			g.drawLine(x, y, x + xl, y + yl);
		}
		StringBuffer randomCode = new StringBuffer();
		int red = 0, green = 0, blue = 0;

		for (int i = 0; i < codeCount; i++)
		{
			String strRand = String.valueOf(codeSequence[random.nextInt(36)]);
			red = random.nextInt(255);
			green = random.nextInt(255);
			blue = random.nextInt(255);

			g.setColor(new Color(red, green, blue));
			g.drawString(strRand, (i + 1) * coord_X, coord_Y);

			randomCode.append(strRand);
		}
		code = randomCode.toString();
	
		return buffImg;

	}
}
