/**
 * Created by Administrator on 2017/3/31.
 */
function checkSignUpInfo() {

    var email = $("#memberSignupAccount").val();
    var captcha = $("#memberSignupCaptcha").val();
    var name = $("#memberSignupName").val();
    var phone = $("#memberSignupPhone").val();
    var memberSignupPassword = $("#memberSignupPassword").val();
    var memberSignupRepwd = $("#memberSignupRepwd").val();
    //alert(password != repassword);
    if (!validateEmail(email)) {
        return false;
    }

    if (captcha == null || captcha == "") {

        alert("验证码不能为空");
        return false;

    }
    if (name == null || name == "") {
        alert("姓名不能为空");
        return false;
    }
    if (phone == null || phone == "" || phone.length != 11) {
        alert("请填写正确的手机号");
        return false;
    }
    if (memberSignupPassword == null || memberSignupPassword == "" || memberSignupPassword.length < 6) {
        alert("密码不能少于6位");
        return false;
    }
    if (memberSignupPassword != memberSignupRepwd) {
        alert("两次密码填写不一致");
        return false;
    }
    return true;
}
function submitForm() {
    // alert("1");

    if (checkSignUpInfo()) {

        var options = {
            url: '/matchPlatform/member_signup.action',
            type: 'post',
            dataType: 'text',
            data: $("#memberSignupForm").serialize(),
            success: function (data) {
                var data = eval("(" + data + ")");
                var result = data.STATUS;
                var reason = data.REASON;
                if (result == "success") {
                    //$.show_warning("提示", "操作成功");
                   // close_modal("#loginmodal");
                    $(".hidemodal").click();
                  //  $("#loginmodal").hide();
                    alert("注册成功");
                  //  window.location.href = "index.html";
                } else if (result == "failed") {
                    // $.show_alert("错误",reason);
                    alert(reason);
                }
            }
        };
        $.ajax(options);
    }

}
function getCaptcha(a) {
    var email = $("#memberSignupAccount").val();
    if (validateEmail(email)) {
        Site.changeCaptchaImg(a);
        $.ajax({
            url: "/matchPlatform/getValidate_sendEmailCode.action?email=" + email,
            type: "GET",
            // data : para,
            dataType: "text",
            success: function (result) {

            }
        });

    }
}

function validateEmail(val) {
    if (val == "") {
        alert("邮箱不能为空");
        return false;
    }
    if (!val.match(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/)) {
        alert("邮箱格式不正确！请重新输入");
        $("#account").focus();
        return false;
    }
    return true;
}
function login(action,account,password)
{
    if(validateEmail($(account).val()))
    {
        if($(password).val()!="")
        {
            $.post(action,
                {
                    account:$(account).val(),
                    password:$(password).val(),
                }, function(result) {

                    var data = eval("(" + result + ")");
                    var result = data.STATUS;
                    var reason = data.REASON;
                    if (result == "success") {
                        window.location.href = "index.html";
                    } else if (result == "failed") {
                        // $.show_alert("错误",reason);
                        alert(reason);
                    }
                }
            );
        }
        else
        {
            alert("请填上密码");
        }
    }
}
function onLogout() {
	  $.ajax({
          url : "member_logout.action",
          type : "post",
          success : function(r) {
              window.location.href = "index.html";
          }
      });
}