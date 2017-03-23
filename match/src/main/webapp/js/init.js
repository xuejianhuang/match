$(function() {
	initLogin();
	InitLeftMenu();
	tabClose();
	tabCloseEven();
})

// 初始化左侧
function InitLeftMenu() {
	$
			.ajax({
				url : "oa_getPrivileges.action",
				type : "POST",
				dataType : "json",
				success : function(_menus) {

					$("#westreg").empty();
					var menulist = "";
					menulist += '<div class="easyui-accordion" fit="true" border="false">';
					$
							.each(
									_menus.RESULT,
									function(i, n) {
										menulist += '<div title="'
												+ n.name
												+ '" data-options="iconCls:\''
												+ n.icon
												+ '\'" style="overflow: auto; padding: 5px;">';
										menulist += '<ul>';
										$
												.each(
														n.childMenus,
														function(j, o) {
															menulist += '<li><div><a href="###" rel="'
																	+ o.url
																	+ '" ref="'
																	+ o.id
																	+ '"><span class="'
																	+ o.icon
																	+ '" style="width: 16px; display: inline-block">&nbsp;</span><span class="nav">'
																	+ o.name
																	+ '</span></a></div></li>';
														});
										menulist += '</ul></div>';
									});
					menulist += '</div>';
					$("#westreg").append(menulist);

					$('.easyui-accordion li a').click(
							function() {
								var tabTitle = $(this).children('.nav').text();

								var url = $(this).attr("rel");
								var menuid = $(this).attr("ref");
								var icon = $(this).children('span').first()
										.attr('class');
								addTab(tabTitle, url, icon);
								$('.easyui-accordion li div').removeClass(
										"selected");
								$(this).parent().addClass("selected");
							}).hover(function() {
						$(this).parent().addClass("hover");
					}, function() {
						$(this).parent().removeClass("hover");
					});

					// 导航菜单绑定初始化
					$(".easyui-accordion").accordion();
				},
				error : function(xhr, status) {
					if (xhr.responseText == "timeout") {
						$.relogin();
					}
				}
			});

}

function initLogin() {
	getSession(function f(r) {
		try {
			// var user = $.parseJSON(r);
			var user = eval("(" + r + ")");
			if (user != null) {
				var role=getRoleName(user.roleName);
//				if (user.status ==0)
//					{
//					$.activate("activate.html",
//							"oa_OperActivate.action",350,250);
//					}
//				if(user.roleName!="admin")
//					{
//					  $("#changebonusparamdisplay").remove();
//					  $("#switchdisplay").remove();
//					  $("#switchdisplay2").remove();
//					}
				$("#div_welcom").html("<b>" + role + ":" + user.account + "，欢迎您！");
				$("#hd_account").val(user.account);
			} else {
				$.relogin();
			}
		} catch (e) {
		}

	})
}
function addTab(subtitle, url, icon) {
	if (!$('#tabs').tabs('exists', subtitle)) {
		$('#tabs').tabs('add', {
			title : subtitle,
			// content: createFrame(url),
			href : url,
			closable : true,
			icon : icon,
			loadingMessage : '正在加载中......'
		});
	} else {
		$('#tabs').tabs('select', subtitle);
	}
	tabClose();
}

function createFrame(url) {
	var s = '<iframe scrolling="auto" frameborder="0"  src="' + url
			+ '" style="width:100%;height:100%;"></iframe>';
	return s;
}

function tabClose() {
	/* 双击关闭TAB选项卡 */
	$(".tabs-inner").dblclick(function() {
		var subtitle = $(this).children(".tabs-closable").text();
		$('#tabs').tabs('close', subtitle);
	});
	/* 为选项卡绑定右键 */
	$(".tabs-inner").bind('contextmenu', function(e) {
		$('#mm').menu('show', {
			left : e.pageX,
			top : e.pageY
		});

		var subtitle = $(this).children(".tabs-closable").text();

		$('#mm').data("currtab", subtitle);
		$('#tabs').tabs('select', subtitle);
		return false;
	});
}
// 绑定右键菜单事件
function tabCloseEven() {
	// 关闭当前
	$('#mm-tabclose').click(function() {
		var currtab_title = $('#mm').data("currtab");
		$('#tabs').tabs('close', currtab_title);
	})
	// 全部关闭
	$('#mm-tabcloseall').click(function() {
		$('.tabs-inner span').each(function(i, n) {
			var t = $(n).text();
			$('#tabs').tabs('close', t);
		});
	});
	// 关闭除当前之外的TAB
	$('#mm-tabcloseother').click(function() {
		var currtab_title = $('#mm').data("currtab");
		$('.tabs-inner span').each(function(i, n) {
			var t = $(n).text();
			if (t != currtab_title)
				$('#tabs').tabs('close', t);
		});
	});
	// 关闭当前右侧的TAB
	$('#mm-tabcloseright').click(function() {
		var nextall = $('.tabs-selected').nextAll();
		if (nextall.length == 0) {
			// msgShow('系统提示','后边没有啦~~','error');
			// alert('后边没有啦~~');
			return false;
		}
		nextall.each(function(i, n) {
			var t = $('a:eq(0) span', $(n)).text();
			$('#tabs').tabs('close', t);
		});
		return false;
	});
	// 关闭当前左侧的TAB
	$('#mm-tabcloseleft').click(function() {
		var prevall = $('.tabs-selected').prevAll();
		if (prevall.length == 0) {
			// alert('到头了，前边没有啦~~');
			return false;
		}
		prevall.each(function(i, n) {
			var t = $('a:eq(0) span', $(n)).text();
			$('#tabs').tabs('close', t);
		});
		return false;
	});

	// 退出
	$("#mm-exit").click(function() {
		$('#mm').menu('hide');
	})
}

function refreshTab() {
	var index = $('#tabs').tabs('getTabIndex', $('#tabs').tabs('getSelected'));
	$('#tabs').tabs('getTab', index).panel('refresh');
}

function closeTab() {
	var index = $('#tabs').tabs('getTabIndex', $('#tabs').tabs('getSelected'));
	$('#tabs').tabs('close', index);
}

function changeTheme(themeName) {
	var $easyuiTheme = $('#easyuiTheme');
	var url = $easyuiTheme.attr('href');
	var href = url.substring(0, url.indexOf('themes')) + 'themes/' + themeName
			+ '/easyui.css';
	$easyuiTheme.attr('href', href);

	var $iframe = $('iframe');
	if ($iframe.length > 0) {
		for ( var i = 0; i < $iframe.length; i++) {
			var ifr = $iframe[i];
			$(ifr).contents().find('#easyuiTheme').attr('href', href);
		}
	}
}

// window.onbeforeunload() {
// if (event.clientX > document.body.clientWidth && event.clientY < 0 ||
// event.altKey) {
// window.event.returnValue = "确定要退出本页吗？";
// }

// }

