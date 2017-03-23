package cn.jxufe.emlab.match.pojo;

import java.util.ArrayList;
import java.util.List;

public class Tree
{
	private String text;
	private List<TreeTrunk> children = new ArrayList<TreeTrunk>();
	

	public List<TreeTrunk> getChildren()
	{
		return children;
	}

	public String getText()
	{
		return text;
	}

	public void setText(String text)
	{
		this.text = text;
	}

}
