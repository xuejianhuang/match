var time = 0;
function keyLogin(event) {
	if (event.keyCode == 13) // 回车键的键值为13
		$("#btn").click(); // 调用登录按钮的登录事件
}
$(function() {
	$("#form1").validationEngine("attach", {
		promptPosition : "bottomLeft",
		scroll : false
	});
	$("#btn").click(
					function() {
						if (!$(".form-signin").validationEngine("validate")) {
							return false;
						}
						time++;
						$.post("oa_login.action",
										{
											account:$("#username").val(),
											password:$("#password").val(),
											validateCode:$("#validateCode").val()
											}, function(result) {

												dealAjaxResult(
														result,
														function(r) {
															window.location.href = "html/index.html";
															// $.show_warning("提示",
															// "登录成功");
															return;
														});
												if (time >= 3) {
													var timenow = new Date()
															.getTime();
													$("#img").attr(
															"src",
															"getValidateCode.action?d="
																	+ timenow);
													$(".spandisplay").css(
															"visibility",
															"visible");
												}
											}
										);
					});
});
function validate() {
	var username = $("#username").val();
	var password = $("#password").val();
	var code = $("#validateCode").val();
	if (username == "" || username.length == 0) {
		$("#RequiredFieldValidator1").css("visibility", "visible");
		return false;
	}
	if (password == "" || password.length == 0) {
		$("#RequiredFieldValidator2").css("visibility", "visible");
		return false;
	}
	if (time > 3 && (code == "" || code.length == 0)) {
		$("#RequiredFieldValidator3").css("visibility", "visible");
		return false;
	}
	// return true;

}
function mOver() {

	$("#font").attr("color", "red");

}
function mOut() {
	var font = document.getElementById("font");
	font.color = "white";

}
function mOver2() {

	$("#font2").attr("color", "red");

}
function mOut2() {
	var font = document.getElementById("font2");
	font.color = "white";

}
function changCode() {
	var timenow = new Date().getTime();
	$("#img").attr("src", "getValidateCode.action?d=" + timenow);
}
