var blogList = {

    init : function (params) {
        blogList.click();
        blogList.searchValue(params);
        blogList.addBlog();
        blogList.delBlogClick(params);
        blogList.updateBlog();
    },

    URL : {
        blogList : function() {
            return '/admin/blog';
        },
        addBlog : function () {
            return '/admin/blog/add';
        },
        delBlog : function () {
            return '/admin/delBlog';
        },
        updateBlog : function () {
            return '/admin/blog/update';
        }
    },

    /**
     * 点击事件
     * @constructor
     */
    click : function () {
        $("#blogSearch").click(function(){
            blogList.search();
        });
        $(document).keydown(function(e) {
            if (e.keyCode == 13) {
                blogList.search();
            }
        });
    },

    /**
     * 搜索事件
     * @constructor
     */
    search : function () {
        var blogCondition = $("#blogCondition").val();
        location.href = blogList.URL.blogList() + "?blogCondition=" + blogCondition;
    },

    /**
     * 搜索表单赋值
     * @param params
     * @constructor
     */
    searchValue : function (params) {
        $("#blogCondition").val(params['blogCondition']);
    },

    addBlog : function () {
        $("#addBlog").click(function(){
            window.location.href = blogList.URL.addBlog();
        });
    },

    delBlogClick : function (params) {
        $(".delBlog").click(function(){
            params.blogId = $(this).parent().attr("blogId");
            params.blogType = $(this).parent().attr("blogType");
            layer.prompt({title: '输入口令，并确认', formType: 1}, function(val, index){
                if(val == "caogen"){
                    layer.close(index);
                    blogList.delBlog(params);
                }
            });
        });
    },

    delBlog : function (params) {
        var headers = {};
        headers['X-CSRF-TOKEN'] = params.token;
        $.ajax({
            type: "POST",
            url: blogList.URL.delBlog(),
            headers: headers,
            data: {"blogId": params.blogId, "blogType": params.blogType},
            success:function (data) {
                if (data.result == true) {
                    layer.msg("success", function(){
                        window.location.href=blogList.URL.blogList();
                    });
                }
            }
        })
    },

    updateBlog : function () {
        $(".updateBlog").click(function(){
            var blogId = $(this).parent().attr("blogId");
            window.location.href = blogList.URL.updateBlog() + "/" + blogId;
        });
    }

}