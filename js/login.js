// /**
//  * Created by renzo on 2017-05-09.
//  */
$(document).ready(function(){
//
//     // document.getElementById("loginBut").addEventListener("click", function(){
//     //     $.ajax({
//     //         url:"/register",
//     //         type:"post",
//     //         data:{
//     //             user:"Admin",
//     //             un:document.getElementById("Username").value,
//     //             pass:document.getElementById("Password").value
//     //         },
//     //         success:function(resp){
//     //             console.log(resp);
//     //         }
//     //     })
//     // });
//
    document.getElementById("loginBut").addEventListener("click", function(){
        $.ajax({
            url:"/login",
            type: "post",
            data:{
                un:document.getElementById("Username").value,
                pass:document.getElementById("Password").value
            },
            success:function(resp){
                console.log(resp);
                //location.href = "/admin";
                if(resp.user.type == "Admin"){
                    location.href = "/admin";
                }
                else if(resp.user.type == "Ramsey"){
                    location.href = "/order";
                }
            }

        });
    });
});
