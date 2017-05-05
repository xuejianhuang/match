//var combobox_select;
var  ufinderAddress="http://emlab.jxufe.cn/ufinder/";
/**
 * 
 * 
 * panel关闭时回收内存，主要用于layout使用iframe嵌入网页时的内存泄漏问题
 */
$.fn.panel.defaults.onBeforeDestroy = function() {

	var frame = $('iframe', this);
	try {
		// alert('销毁，清理内存');
		if (frame.length > 0) {
			for (var i = 0; i < frame.length; i++) {
				frame[i].contentWindow.document.write('');
				frame[i].contentWindow.close();
			}
			frame.remove();
			if ($.browser.msie) {
				CollectGarbage();
			}
		}
	} catch (e) {
	}
};

/**
 * 在iframe中调用，在父窗口中出提示框(herf方式不用调父窗口)
 */
$.extend({
	show_warning : function(strTitle, strMsg) {
		$.messager.show({
			title : strTitle,
			msg : strMsg,
			showType : 'slide',
			style : {
				right : '',
				top : document.body.scrollTop
						+ document.documentElement.scrollTop,
				bottom : ''
			}
		});
	}
});

$.extend({
	show_alert : function(strTitle, strMsg) {
		$.messager.alert(strTitle, strMsg);
	}
});

/**
 * 
 * 
 * @requires jQuery,EasyUI
 * 
 * 防止panel/window/dialog组件超出浏览器边界
 * @param left
 * @param top
 */

var easyuiPanelOnMove = function(left, top) {
	var l = left;
	var t = top;
	if (l < 1) {
		l = 1;
	}
	if (t < 1) {
		t = 1;
	}
	var width = parseInt($(this).parent().css('width')) + 14;
	var height = parseInt($(this).parent().css('height')) + 14;
	var right = l + width;
	var buttom = t + height;
	var browserWidth = $(window).width();
	var browserHeight = $(window).height();
	if (right > browserWidth) {
		l = browserWidth - width;
	}
	if (buttom > browserHeight) {
		t = browserHeight - height;
	}
	$(this).parent().css({/* 修正面板位置 */
		left : l,
		top : t
	});
};
$.fn.dialog.defaults.onMove = easyuiPanelOnMove;
$.fn.window.defaults.onMove = easyuiPanelOnMove;
$.fn.panel.defaults.onMove = easyuiPanelOnMove;

/**
 * 
 * 
 * @requires jQuery,EasyUI
 * 
 * 扩展tree，使其支持平滑数据格式
 */
$.fn.tree.defaults.loadFilter = function(data, parent) {
	var opt = $(this).data().tree.options;
	var idFiled, textFiled, parentField;
	// alert(opt.parentField);
	if (opt.parentField) {
		idFiled = opt.idFiled || 'id';
		textFiled = opt.textFiled || 'text';
		parentField = opt.parentField;
		var i, l, treeData = [], tmpMap = [];
		for (i = 0, l = data.length; i < l; i++) {
			tmpMap[data[i][idFiled]] = data[i];
		}
		for (i = 0, l = data.length; i < l; i++) {
			if (tmpMap[data[i][parentField]]
					&& data[i][idFiled] != data[i][parentField]) {
				if (!tmpMap[data[i][parentField]]['children'])
					tmpMap[data[i][parentField]]['children'] = [];
				data[i]['text'] = data[i][textFiled];
				tmpMap[data[i][parentField]]['children'].push(data[i]);
			} else {
				data[i]['text'] = data[i][textFiled];
				treeData.push(data[i]);
			}
		}
		return treeData;
	}
	return data;
};

/**
 * 
 * 
 * @requires jQuery,EasyUI
 * 
 * 扩展combotree，使其支持平滑数据格式
 */
$.fn.combotree.defaults.loadFilter = $.fn.tree.defaults.loadFilter;

/**
 * 
 * 
 * @requires jQuery,EasyUI
 * 
 * 通用错误提示
 * 
 * 用于datagrid/treegrid/tree/combogrid/combobox/form加载数据出错时的操作/combotree
 */
var easyuiErrorFunction = function(XMLHttpRequest) {
	$.messager.progress('close');
	// $.messager.alert('错误', XMLHttpRequest.responseText);
	if (XMLHttpRequest.responseText == "timeout") { // 未登录
		$.relogin();
	} else {
		// window.parent.window.$.messager.alert('错误',
		// XMLHttpRequest.responseText);
		alert("服务器繁忙请稍后再试");
	}
};
$.fn.datagrid.defaults.onLoadError = easyuiErrorFunction;
$.fn.treegrid.defaults.onLoadError = easyuiErrorFunction;
$.fn.tree.defaults.onLoadError = easyuiErrorFunction;
$.fn.combogrid.defaults.onLoadError = easyuiErrorFunction;
$.fn.combobox.defaults.onLoadError = easyuiErrorFunction;
$.fn.form.defaults.onLoadError = easyuiErrorFunction;
$.fn.combotree.defaults.onLoadError = easyuiErrorFunction;

/**
 * 
 * 
 * @requires jQuery,EasyUI
 * 
 * 扩展validatebox，添加验证两次密码功能
 */
$.extend($.fn.validatebox.defaults.rules, {
	eqPwd : {
		validator : function(value, param) {
			return value == $(param[0]).val();
		},
		message : '密码不一致！'
	}
});
// 自定义验证
$.extend($.fn.validatebox.defaults.rules, {
	phone : {
		validator : function(value) {
			var rex = /^1[3-8]+\d{9}$/;
			var rex2 = /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;
			if (rex.test(value) || rex2.test(value)) {
				return true;
			} else {
				return false;
			}

		},
		message : '请输入正确电话或手机格式'
	}
});
/*
 * 
 * 用户未登录 或session超时 弹出登录框重新登录
 */
$
		.extend({
			relogin : function() {

				$("<div/>")
						.attr("id", "dialog_relogin")
						.dialog(
								{
									title : " 未登录或登录超时，请重新登录",
									href : "relogin.html",
									width : 300,
									height : 200,
									closable : false,
									iconCls : "icon-lock",
									modal : true,
									buttons : [
											{
												text : "登录",
												iconCls : "icon-key",
												handler : function() {
													var para = {};
													para.account = $(
															"#relogin_account")
															.val();
													para.password =$.md5($(
															"#relogin_pwd")
															.val());
													para.timespan = new Date()
															.getTime();
													$
															.ajax({
																url : "oa_relogin.action",
																type : "POST",
																data : para,
																dataType : "text",
																success : function(
																		result) {
																	dealAjaxResult(
																			result,
																			function(
																					r) {
																				$
																						.show_warning(
																								"提示",
																								"登录成功");
																				$(
																						"#dialog_relogin")
																						.dialog(
																								'destroy');
																				InitLeftMenu();
																				getSession(function f(
																						r) {
																					try {
																						var user = eval("("
																								+ r
																								+ ")");
																						// if
																						// (user.status
																						// ==0)
																						// {
																						// $.activate("activate.html",
																						// "oa_OperActivate.action",350,250);
																						// }
																						var role = getRoleName(user.roleName);
																						// if(user.roleName!="admin")
																						// {
																						// $("#changebonusparamdisplay").remove();
																						// $("#switchdisplay").remove();
																						// $("#switchdisplay2").remove();
																						// $("#changebonusparamdisplay2").remove();
																						// }
																						$(
																								"#div_welcom")
																								.html(
																										"<b>"
																												+ role
																												+ ":"
																												+ user.account
																												+ "，欢迎您！");
																						$(
																								"#hd_account")
																								.val(
																										user.account);
																					} catch (e) {
																					}

																				})
																			});

																}
															});
												}

											},
											{
												text : "退出系统",
												iconCls : "icon-cancel",
												handler : function() {
													window.location.href = "../login.html";
												}
											} ]
								})
			}
		});

/*
 * 
 * 用户激活
 */

/*
 * $.extend({ activate : function(url, activateAction, width, height) {
 * 
 * $("<div/>").attr("id", "dialog_activate").dialog({ title : "修改初始密码", href :
 * url, width : width, height : height, closable : false, iconCls : "icon-lock",
 * modal : true, buttons : [ { text : "提交", iconCls : "icon-key", handler :
 * function() { var d = $(this).closest('.window-body');
 * $("#f_activate").form("submit", { url : activateAction, onSubmit : function() {
 * return $(this).form('validate'); }, success : function(result) {
 * dealAjaxResult(result, function(r) { d.dialog('destroy');
 * $.show_warning("提示", "修改成功"); }); } }); } }, { text : "下次修改", iconCls :
 * "icon-cancel", handler : function() {
 * $(this).closest('.window-body').dialog('destroy'); } } ] }) } });
 */

/*
 * zf 获取session
 */
function getSession(deal) {
	// alert(12);
	$.ajax({
		url : "getSession_getOperatorInfo.action?_" + new Date().getTime(),
		type : "POST",
		success : function(r) {

			deal(r);
		}
	});
}
/*
 * 判断后台开关的状态
 */

/*
 * zf 处理ajax返回值通用处理方法
 * 
 */
function dealAjaxResult(data, okFun) {
	var data = eval("(" + data + ")");
	var result = data.STATUS;
	var reason = data.REASON;
	if (result == "timeout") {
		$.relogin();
	}

	else if (result == "success") {
		okFun(data);
	} else if (result == "failed") {
		// $.show_alert("错误",reason);
		alert(reason);
	}
}

/**
 * 
 * 
 * @requires jQuery
 * 
 * 改变jQuery的AJAX默认属性和方法
 */
$.ajaxSetup({
	// type: 'POST',
	error : function(XMLHttpRequest, textStatus, errorThrown) {
		$.messager.progress('close');
		$.messager.alert('错误', XMLHttpRequest.responseText);
	}
});

/*
 * 
 */
function loadForm(formid, data) {
	for ( var item in data) {
		var loca = formid + " #" + item;
		var classname = $(loca).attr("class");

		// alert(loca+":"+classname+"="+data[item]);

		if (classname == "easyui-datebox datebox-f combo-f"
				&& data[item] != null && data[item].length > 8) {
			$(loca).datetimebox({
				value : data[item],
				formatter : formaterdate,
				parser : parserdate
			});
		} else if (classname == "easyui-combobox combobox-f combo-f") {
			$(loca).combobox('select', data[item]);
		} else if (classname == 'easyui-numberbox numberbox-f textbox-f') {
			$(loca).numberbox('setValue', data[item]);
		} else if (classname == 'image') {
			$(loca).val(data[item]);

			// $('#show_image').src = data[item];

			$('#show_image').attr('src', data[item]);
		} else {

			$(loca).val(data[item]);
		}
	}
}
function formaterDateBox(dateBoxId, stringDate) {
	$(dateBoxId).datetimebox({
		value : stringDate,
		formatter : formaterdate,
		parser : parserdate
	});
}
function formaterdate(date) {
	return date.getFullYear() + '-' + (date.getMonth() + 1) + '-'
			+ date.getDate();
}
function parserdate(date) {
	return new Date(Date.parse(date.replace(/-/g, "/")));
}
function formatterstringdate(val) {
	if (val == null)
		return "";
	if (val.length > 10)
		return val.substring(0, 10);
	return val;
}

function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null)
		return unescape(r[2]);
	return null;
}

function changepwds() {
	$("<div/>").attr("id", "dialog_changepassword").dialog({
		title : " 修改密码",
		href : "changepassword.html",
		width : 320,
		height : 230,
		closable : false,
		iconCls : "icon-lock",
		modal : true,
		buttons : [ {
			text : "确定修改",
			iconCls : "icon-key",
			handler : function() {
				var para = {};
				para.oldPassword = $("#oldPassword").val();
				para.newPassword = $("#newPassword").val();
				para.verifyPassword = $("#verifyPassword").val();
				para.action = "changepassword";
				if (para.oldPassword == null || para.oldPassword == "") {
					alert("请输入原密码");
					return;
				}
				if (para.newPassword == null && para.newPassword == "") {
					alert("新密码不能为空");
					return;
				}
				if (para.newPassword.length < 6) {
					alert("密码不能少于6位");
					return;
				}
				if (para.verifyPassword == null && para.verifyPassword == "") {
					alert("确认密码不能为空");
					return;
				}
				if (para.verifyPassword != para.newPassword) {
					alert("两次密码输入不一致");
					return;
				}
				$.ajax({
					url : "oa_changePassword.action",
					type : "POST",
					data : para,
					dataType : "text",
					success : function(result) {
						dealAjaxResult(result, function(r) {
							$.show_warning("提示", "修改成功");
							$("#dialog_changepassword").dialog('destroy');
						});
					}
				});
			}

		}, {
			text : "取消",
			iconCls : "icon-cancel",
			handler : function() {
				$("#dialog_changepassword").dialog('destroy');
			}
		} ]
	})
}
function logout() {
	$.messager.confirm('提示！', '确定退出系统？', function(r) {
		if (r) {
			var para = {
				"action" : "logout"
			};
			$.ajax({
				url : "oa_logout.action",
				type : "post",
				data : para,
				success : function(r) {
					window.location.href = "../login.html";
				}
			});
		}
	});
}
function openDialog(hrefurl, title, width, height) {
	$("<div/>").dialog({
		href : hrefurl,
		title : title,
		height : height,
		width : width,
		modal : true,
		iconCls : "icon-add",
		onClose : function() {
			$(this).dialog('destroy');
		}
	});

}

function add(hrefurl, title, height, width, handlerurl, datagridid) {
	$("<div/>").dialog({
		href : hrefurl,
		title : title,
		height : height,
		width : width,
		modal : true,
		iconCls : "icon-add",
		buttons : [ {
			text : '确定添加',
			iconCls : 'icon-add',
			handler : function() {
				var d = $(this).closest('.window-body');
				$("#form_add").form({
					url : handlerurl,
					onSubmit : function(param) {
						param.action = 'add';
						return $(this).form('validate');
					},
					success : function(result) {
						dealAjaxResult(result, function(r) {
							d.dialog('destroy');
							$.show_warning("提示", "操作成功");
							$("#" + datagridid).datagrid("reload");
						});
					}
				});
				$("#form_add").submit();
			}
		}, {
			text : '取消添加',
			iconCls : 'icon-cancel',
			handler : function() {
				$(this).closest('.window-body').dialog('destroy');
			}
		} ],
		onClose : function() {
			$(this).dialog('destroy');
		}
	});
}
function edit(hrefurl, title, height, width, handlerurl, datagridid) {
	var r = $("#" + datagridid).datagrid("getChecked");
	if (r.length < 1) {
		$.show_warning("错误", "请选择一条记录");
		return;
	}
	if (r.length > 1) {
		$.show_warning("错误", "一次只能修改一条记录");
		$("#" + datagridid).datagrid('clearSelections')
				.datagrid('clearChecked');
		return;

	}

	$("<div/>")
			.dialog(
					{
						href : hrefurl,
						title : title,
						height : height,
						width : width,
						modal : true,
						iconCls : "icon-edit",
						buttons : [
								{
									text : '确定修改',
									iconCls : 'icon-edit',
									handler : function() {
										var d = $(this).closest('.window-body');
										$("#form_edit")
												.form(
														{
															url : handlerurl,
															onSubmit : function(
																	param) {
																param.action = 'edit';
																param.id = r[0].id;
																return $(this)
																		.form(
																				'validate');
															},
															success : function(
																	result) {
																dealAjaxResult(
																		result,
																		function(
																				r) {
																			d
																					.dialog('destroy');
																			$
																					.show_warning(
																							"提示",
																							"操作成功");
																			$(
																					"#"
																							+ datagridid)
																					.datagrid(
																							"reload")
																					.datagrid(
																							'clearSelections')
																					.datagrid(
																							'clearChecked');
																		});
															}
														});
										$("#form_edit").submit();
									}
								},
								{
									text : '取消修改',
									iconCls : 'icon-cancel',
									handler : function() {
										$(this).closest('.window-body').dialog(
												'destroy');
									}
								} ],
						onClose : function() {
							$(this).dialog('destroy');
						},
						onLoad : function() {
							loadForm("#form_edit", r[0]);
						}
					});

}
function detailinfo(hrefurl, title, height, width, datagridid) {
	// alert(1);
	var r = $("#" + datagridid).datagrid("getChecked");
	if (r.length < 1) {
		$.show_warning("错误", "请选择一条记录");
		return;
	}
	if (r.length > 1) {
		$.show_warning("错误", "一次只能查看一条记录");
		$("#" + datagridid).datagrid('clearSelections')
				.datagrid('clearChecked');
		return;

	}

	$("<div/>").dialog({
		href : hrefurl,
		title : title,
		height : height,
		width : width,
		modal : true,
		iconCls : "icon-edit",
		buttons : [ {
			text : '',
			iconCls : 'icon-undo',
			handler : function() {
				$(this).closest('.window-body').dialog('destroy');
			}
		} ],
		onClose : function() {
			$(this).dialog('destroy');
		},
		onLoad : function() {
			loadForm("#form_detailinfo", r[0]);

		}
	});

}

function del(handlerurl, datagridid) {
	var rows = $("#" + datagridid).datagrid("getChecked");
	if (rows.length < 1) {
		$.show_warning("错误", "请选择要删除的记录");
		return;
	}
	$.messager.confirm('提示！', '确定删除这' + rows.length + '条记录?', function(r) {
		if (r) {
			para = {};
			para.action = "dele";
			para.timespan = new Date().getTime();
			para.id = "";
			$.each(rows, function(i, row) {
				para.id = para.id + "'" + row.id + "',";
			});
			$.ajax({
				url : handlerurl,
				data : para,
				type : "POST",
				dataType : "text",
				success : function(result) {
					dealAjaxResult(result, function(r) {
						$.show_warning("提示", "操作成功");
						$("#" + datagridid).datagrid("reload").datagrid(
								'clearSelections').datagrid('clearChecked');
						;
					});
				}
			});
		}
	});
}

function getCurDateyy_mm_dd() {
	var today = new Date();
	var day = today.getDate(); // 获取当前日(1-31)
	var month = today.getMonth() + 1; // 显示月份比实际月份小1,所以要加1
	var year = today.getFullYear(); // 获取完整的年份(4位,1970-????) \
	month = month < 10 ? "0" + month : month; // 数字<10，实际显示为，如5，要改成05
	day = day < 10 ? "0" + day : day;
	var date = year + "-" + month + "-" + day;
	return date;
}
function getNextDateyy_mm_dd() {
	var today = new Date();
	var next = new Date(today.getTime() + 86400000);
	var day = next.getDate(); // 获取当前日(1-31)
	var month = next.getMonth() + 1; // 显示月份比实际月份小1,所以要加1
	var year = next.getFullYear(); // 获取完整的年份(4位,1970-????) \
	month = month < 10 ? "0" + month : month; // 数字<10，实际显示为，如5，要改成05
	day = day < 10 ? "0" + day : day;
	var date = year + "-" + month + "-" + day;
	return date;
}
function getRoleName(val) {
	var role;
	if (val == "admin") {
		return "超级管理员";
	} else {
		return val;
	}

}
function formatterrole(val) {
	if (val == null)
		return "";
	else if (val == 'admin')
		return '超级管理员';
	else
		return val;

}

function formatterMatchLevel(val) {
	if (val == 0)
		return "院级";
	else if (val == 1)
		return '校级';
	else if (val == 2)
		return '省级';
	else if (val == 3)
		return '国家级';
	else
		return val;

}
function formatterregistrationScope(val) {
	if (val == 1)
		return '本校';
	else if (val == 2)
		return '全省';
	else if (val == 3)
		return '全国';
	else
		return val;

}
function formatterisTeamMatch(val) {
	if (val == 0)
		return '个人赛';
	else if (val == 1)
		return '团体赛';
	return val;

}
function formatterIsJxufe(val) {
	if (val == 0)
		return "否";
	else if (val == 1)
		return '是';
	else
		return val;

}
function formatterProfession(val) {
	if (val == 0)
		return "学生";
	else if (val == 1)
		return '老师';
	else if (val == 2)
		return '其他';
	else
		return val;

}
function formatterdatesubstring(val) {
	if (val == null)
		return "";
	if (val.length > 10)
		return val.substring(0, 10);
	return val;
}

function formatterMatchDetail(val, row, index) {
	// var baseUrl = "/ufinder/";
	if (val != null && val != "") {
		var innerHtml = '<a href=downloadAction_download.action?target='
				+ val + '">文件下载</a>';
		return innerHtml;
	} else
		return "";
}

/*
 * button:图片上传点击按钮 img:图片上传成功后显示图片 returnValeAssignment：赋值图片上传成功后返回图片访问路径（）
 * ThumbUrlAssigment:赋值压缩图片的访问路径（默认为正常图片下small文件夹下正常图片名字_s）;
 */
function initImageUpload(button, img, returnValeAssignment, ThumbUrlAssigment) {

	var interval;
	//var baseUrl = "/ufinder/";
	new AjaxUpload (button, {
		action :  'upload_logoAndBannerImgUpload.action', //ufinderAddress+ '/ufinderServlet?cmd=upload&target=/dasaipingtai/news/',
		data : {
		// id : id
		},
		name : 'filedata', // 'filedata',
		onSubmit : function(file, ext) {
			// id = $("#id").val();
			if (!(ext && /^(jpg|JPG|png|PNG|gif|GIF)$/.test(ext))) {
				alert("您上传的图片格式不对，请重新选择！");
				return false;
			}
			// change button text, when user selects file
			button.text('上传中');

			// If you want to allow uploading only 1 file at time,
			// you can disable upload button
			this.disable();

			// Uploding -> Uploading. -> Uploading...
			interval = window.setInterval(function() {
				var text = button.text();
				if (text.length < 10) {
					button.text(text + '|');
				} else {
					button.text('上传中');
				}
			}, 200);
		},
		onComplete : function(file, res) {
			window.clearInterval(interval);
			// enable upload button

			this.enable();
			var response = eval("(" + res + ")");
			var status = response.message;

			if ("success" == status) {
				//var file = response.data.file;
				var filePath = response.path;//ufinderAddress + "/files/" + file.path;
				var small_filePath =response.small_path;   //ufinderAddress + "/files/" + file.small_path;
				// alert(filePath);
				returnValeAssignment.val(filePath);
				img.attr('src', filePath + "?_" + new Date().getTime());
				// ThumbUrlAssigment.val(getSmallImgPath(filePath));
				if (ThumbUrlAssigment) {
					ThumbUrlAssigment.val(small_filePath);
				}
				// alert(img[0].src);

			} else {
				alert("图片上传失败！");
			}

		}
	});

}
/*
 * button:文件上传点击按钮 name: 上传成功后显示文件名称 returnValeAssignment：赋值图片上传成功后返回图片访问路径（）
 */
function initFileUpload(button, name, returnValeAssignment) {

	var interval;
	//var baseUrl = "/ufinder/";
	new AjaxUpload(button, {
		action : 'upload_fileUpload.action',
		data : {
		// id : id
		},
		name : 'filedata', // 'filedata',
		onSubmit : function(file, ext) {
			// id = $("#id").val();
			if (!(ext && /^(doc|docx|txt|xls|xlsx|xml|zip|rar)$/.test(ext))) {
				alert("您上传文件格式不对，请重新选择！");
				return false;
			}
			// change button text, when user selects file
			button.text('上传中');

			// If you want to allow uploading only 1 file at time,
			// you can disable upload button
			this.disable();

			// Uploding -> Uploading. -> Uploading...
			interval = window.setInterval(function() {
				var text = button.text();
				if (text.length < 10) {
					button.text(text + '|');
				} else {
					button.text('上传中');
				}
			}, 200);
		},
		onComplete : function(file, res) {
			window.clearInterval(interval);
			// enable upload button

			this.enable();
			var response = eval("(" + res + ")");
			var status = response.message;

			if ("success" == status) {
				var filePath = response.path;
				returnValeAssignment.val(filePath);
				name.html("");
				name
						.append(filePath
								.substring(filePath.lastIndexOf("/") + 1));

			} else {
				alert("文件上传失败！");

			}

		}
	});

}
function ajaxSend(url, para, callBack) {
	/*
	 * var para = {}; para.cardPrice = $("#cardPrice").val(); para.ratio =
	 * $("#ratio").val(); para.quarter_ratio = $("#quarter_ratio").val();
	 * para.year_ratio = $("#year_ratio").val();
	 * 
	 * if (isNaN(para.cardPrice) ||isNaN(para.ratio)) { alert("请输入正确的数值格式");
	 * return; }
	 */

	$.ajax({
		url : url,
		type : "POST",
		data : para,
		dataType : "text",
		success : function(result) {
			dealAjaxResult(result, function(r) {
				// $.show_warning("提示", "操作成功");
				if (callBack) {
					callBack();
				}
			});
		}
	});
}
function createPiecharts(title, data) {
	$("<div/>").dialog(
			{
				href : "public/highcharts.html",
				title : "分析图表",
				height : 450,
				width : 600,
				modal : true,
				onClose : function() {
					$(this).dialog('destroy');
				},
				onLoad : function() {
					var chart;
					$(document).ready(
							function() {
								chart = new Highcharts.Chart({
									chart : {
										renderTo : 'container',
										plotBackgroundColor : null,
										plotBorderWidth : null,
										plotShadow : false,
										type : 'pie'
									},
									title : {
										text : title
									},
									tooltip : {
										// pointFormat: '{series.name}:
										// <b>{point.percentage}%</b>'
										valueSuffix : '%'
									},
									plotOptions : {
										pie : {
											allowPointSelect : true,
											cursor : 'pointer',
											dataLabels : {
												formatter : function() {
													// display only if larger
													// than 0.1
													// return this.y > 0.1 ?
													// '<b>'+ this.point.name
													// +':</b> '+ this.y +'%' :
													// null;
													return '<b>'
															+ this.point.name
															+ ':</b> ' + this.y
															+ '%';

												}
											}
										// dataLabels: {
										// enabled: true,
										// color: '#000000',
										// connectorColor: '#000000',
										// format: '{point.name}:
										// {point.percentage}%' //不起作用???
										// }
										}
									},
									credits : {// 图表右下角的水印，默认是highcharts.com,将其设为空串可以取消水印
										text : '',
										fontSize : '0'
									},
									// series: series

									series : [ {
										type : 'pie',
										name : '所占比例',
										data : data

									} ]
								});
							});

				}
			});
}
function createLinecharts(title, xAxis, yAxis, series) {
	$("<div/>").dialog({
		href : "public/highcharts.html",
		title : "统计图表",
		height : 500,
		width : 950,
		modal : true,
		onClose : function() {
			$(this).dialog('destroy');
		},
		onLoad : function() {
			$(document).ready(function() {
				new Highcharts.Chart({
					chart : {
						renderTo : 'container',
						type : 'line'
					},
					title : {
						text : title
					},
					subtitle : {
					// text: subtitletext
					},
					xAxis : {
						categories : xAxis
					},
					yAxis : {
						title : {
							text : yAxis
						},
						plotLines : [ {
							value : 0,
							width : 0.6,
							color : '#808080'
						} ]
					},
					credits : {// 图表右下角的水印，默认是highcharts.com,将其设为空串可以取消水印
						text : '',
						fontSize : '0'
					},
					tooltip : {
					// formatter: function() {
					// return '<b>'+ this.series.name +'</b><br/>'+
					// this.x +': '+ this.y +'';
					// }
					},
					series : series
				});
			});

		}
	});

}
function createBarcharts(title, xAxis, yAxis, series) {
	$("<div/>")
			.dialog(
					{
						href : "public/highcharts.html",
						title : "统计图表",
						height : 500,
						width : 950,
						modal : true,
						onClose : function() {
							$(this).dialog('destroy');
						},
						onLoad : function() {
							$(document)
									.ready(
											function() {
												new Highcharts.Chart(
														{
															chart : {
																renderTo : 'container',
																type : 'bar'
															},
															title : {
																text : title
															},
															subtitle : {
															// text: subtitletext
															},
															xAxis : {
																categories : xAxis
															},
															yAxis : {
																title : {
																	text : yAxis
																},
															},
															tooltip : {

															},
															plotOptions : {
																bar : {
																	dataLabels : {
																		enabled : true,
																		allowOverlap : true
																	}
																}
															},
															legend : {
																layout : 'vertical',
																align : 'right',
																verticalAlign : 'top',
																x : -40,
																y : 100,
																floating : true,
																borderWidth : 1,
																backgroundColor : ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
																shadow : true
															},
															credits : {// 图表右下角的水印，默认是highcharts.com,将其设为空串可以取消水印
															enabled:false
															},
															series : series
														});
											});

						}
					});

}
member_btn_piechart = function(name, trainItemId, matchProjectId) {
	var param = "";
	if (trainItemId) {
		param = "&trainItemId=" + trainItemId;
	}
	if (matchProjectId) {
		param += "&matchProjectId=" + matchProjectId;
	}
	$.ajax({
		url : "member_getPropertyRatio.action?name=" + name + param,
		type : "POST",
		dataType : "text",
		success : function(result) {
			dealAjaxResult(result, function(r) {
				var data = new Array();
				for ( var i in r.RESULT) {
					var item_data = new Array();
					item_data[0] = i;
					item_data[1] = r.RESULT[i];
					data.push(item_data);
				}
				createPiecharts('会员学校比例', data);

			});

		}
	});

};

matchProjectMember_btn_barchart = function(matchId) {
	var param = "";
	if (matchId) {
		param = "?matchId=" + matchId;
	}
	$.ajax({
		url : "matchProject_getMatchProjectMemberNumAndGroupNum.action"+param,
		type : "POST",
		dataType : "text",
		success : function(result) {
			dealAjaxResult(result, function(r) {
				var series = new Array();
				var xAxis=new Array();
				var g_obj=new Object();
				 g_obj.name="组数";
				 var g_obj_data=new Array();
				 g_obj.data=g_obj_data;
				 var m_obj=new Object();
				 m_obj.name="人数";
				 var m_obj_data=new Array();
				 m_obj.data=m_obj_data;
				 json = JSON.parse(r.rows);
				for ( var i in json) {
					xAxis.push(json[i].matchProjectCaption);
					g_obj_data.push(json[i].groupNum);
					m_obj_data.push(json[i].memberNum);
				}
				series.push(g_obj);
				series.push(m_obj);
				createBarcharts('各赛项报名情况', xAxis,"报名数",series);
				
			});

		}
	});

};
trainMember_btn_barchart = function(matchId) {
	var param = "";
	if (matchId) {
		param = "?matchId=" + matchId;
	}
	$.ajax({
		url : "trainItem_getTraimMemberNum.action"+param,
		type : "POST",
		dataType : "text",
		success : function(result) {
			dealAjaxResult(result, function(r) {
				var series = new Array();
				var xAxis=new Array();
				 var m_obj=new Object();
				 m_obj.name="人数";
				 var m_obj_data=new Array();
				 m_obj.data=m_obj_data;
				 json = JSON.parse(r.rows);
				for ( var i in json) {
					xAxis.push(json[i].trainCaption);
					m_obj_data.push(json[i].memberNum);
				}
				series.push(m_obj);
				createBarcharts('各培训报名情况', xAxis,"报名数",series);
				
			});

		}
	});

};
