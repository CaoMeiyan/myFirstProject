/**
 * Created by dell on 2016/6/29.
 */
init();
var getUser=function (user) {
    return `<tr id="tr_${user.id}"><td>${user.id}</td>
    <td>${user.name}</td>
    <td>
    <button class="btn btn-danger" onclick="del(${user.id})">删除</button>
    <button onclick="update(${user.id})" class="btn btn-warning">修改</button>
        </td></tr>`
};
function init(){
    var keyword=$('#keyword').val();
    var orderBy=$('#orderBy').val();
    var order=$('#order').val();
    var pageSize=$('#pageSize').val()||2;
    var pageNum=$('#pageNum').val()||1;
    
    $.get(`/users?keyword=${keyword}&orderBy=${orderBy}&order=${order}&pageSize=${pageSize}&pageNum=${pageNum}`).success(function(result){
       var data=result.data;
        var users=data.users;
        var html='';
        $.each(users,function (index, item) {
            html+=getUser(item);
        });
        $('#userList').html(html);

        var pageNum=data.pageNum;
        $('#pageNum').val(pageNum);
        var totalPage=data.totalPage;
        var pages='';
        if(pageNum>1){
            pages+= `<li><a onclick="goto(${pageNum -1})" href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>`;
        }
        for (var i=1;i<totalPage;i++){
            pages+=`<li class="${i == pageNum ?'active':''}"><a onclick="goto(${i})" href="#">${i}</a></li>`;
        }
        if(pageNum<totalPage){
            pages+=`<li><a onclick="goto(${pageNum + 1})" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span></a></li>`;
        }
        $('#pager').html(pages);
    });
}
function goto(pageNum) {
    $('#pageNum').val(pageNum);
    init();
}



function add() {
    $('#userId').val('');
    $('#name').val('');
    $('#userModal').modal('show');
}
function save() {
    var id=$(`#userId`).val();
    var name=$('#name').val();
    var user={name:name};
    if(id){
        user.id=id;
        $.ajax({
           url:'/users',
            method:'PUT',
            data:user
        }).success(function (result) {
            var user=result.data;
            $(`#tr_${id}`).replaceWith(getUser(user));
            //$(`#tr_${id}`).remove();
            $('#alert').html('操作成功');
            $('#userModal').modal('hide');
        }).error(function (err) {
            $('#alert').html('操作失败');
        });

    }else {
        $.post('/users',user).success(function (result) {
            //console.log(result);
            var code=result.code;
            if(code=='ok'){
                var user=result.data;
                // console.log(result);
                $('#userList').append(getUser(user));
                $('#name').val('');
                $('#alert').html('操作成功');
                $('#userModal').modal('hide');
            }else {
                $('#alert').html('操作失败');
            }

        });
    }


}
function del(id) {
    $.ajax({
        url:`/users?id=${id}`,
        method:'DELETE'
    }).success(function (result) {
        $(`#tr_${id}`).remove();
        $(`#alert`).html('操作成功');
    }).error(function (result) {
        $(`#alert`).html('操作失败');
    });
}
function update(id){
    $.get(`/users?id=${id}`).success(function (result) {
        var user=result.data;
        $('#name').val(user.name);
        $('#userId').val(user.id);
        $('#userModal').modal('show');
    });
}
