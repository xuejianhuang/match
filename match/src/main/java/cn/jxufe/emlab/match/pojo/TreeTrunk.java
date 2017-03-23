package cn.jxufe.emlab.match.pojo;

import java.util.ArrayList;
import java.util.List;

public class TreeTrunk
{
  private String id;
  private String text;
  private String iconCls;
  private List<Leaf> children=new ArrayList<Leaf>();
  
  
public List<Leaf> getChildren()
{
	return children;
}
public String getId()
{
	return id;
}
public void setId(String id)
{
	this.id = id;
}
public String getText()
{
	return text;
}
public void setText(String text)
{
	this.text = text;
}
public String getIconCls()
{
	return iconCls;
}
public void setIconCls(String iconCls)
{
	this.iconCls = iconCls;
}
  
}
