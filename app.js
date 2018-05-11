// 全局用户信息
var customSession = JSON.parse(sessionStorage.getItem('customSession'));

// 注册全局组件 - 自定义菜单
Vue.component("custom-menu", {
    props: ["one", "two", "type"],
    template: `<nav class="navbar-default navbar-static-side" role="navigation">
    <div class="sidebar-collapse">
        <ul class="nav metismenu" id="side-menu">
            <li class="nav-header">
                <div cdiss="dropdown profile-element">
                    <a class="dropdown-toggle" href="./index.html">
                            <span class="clear"> <span class="block m-t-xs"> <strong class="font-bold">后台管理中心</strong>
                             </span> </span> </a>
                </div>
                <div class="logo-element">
                    IN+
                </div>
            </li>
            <template v-for="menu in menus ">
                <li v-if="one == menu.c_title" :class="[type]" >
                    <a :href="menu.c_url"><i class="fa fa-th-large"></i> <span class="nav-label">{{menu.c_title}}</span> <span
                            class="fa arrow"></span></a>
                    <ul class="nav nav-second-Status collapse">
                        <template v-for="level in menu._child">
                            <li v-if="two == level.c_title" :class="[type]" ><a :href="level.c_url">{{level.c_title}}</a></li>
                            <li v-else><a :href="level.c_url">{{level.c_title}}</a></li>
                        </template>
                    </ul>
                </li>
                <li v-else >
                    <a :href="menu.c_url"><i class="fa fa-th-large"></i> <span class="nav-label">{{menu.c_title}}</span> <span
                            class="fa arrow"></span></a>
                    <ul class="nav nav-second-Status collapse">
                        <template v-for="level in menu._child">
                            <li v-if="two == level.name" :class="[type]" ><a :href="level.c_url">{{level.c_title}}</a></li>
                            <li v-else><a :href="level.c_url">{{level.c_title}}</a></li>
                        </template>
                    </ul>
                </li>
            </template>
        </ul>
    </div>
</nav>`,
    data:function () {
        return customSession.data;
    }
})

// 注册全局组件 - 自定义页头
Vue.component("custom-head", {
    template: `<div class="row border-bottom">
            <nav class="navbar navbar-static-top  " role="navigation" style="margin-bottom: 0">
                <ul class="nav navbar-top-links navbar-right">
                    <li>
                        <a href="register.html">
                            <i class="fa fa-sign-out"></i> 修改密码
                        </a>
                    </li>
                    <li>
                        <a href="login.html">
                            <i class="fa fa-sign-out"></i> 安全退出
                        </a>
                    </li>
                </ul>
            </nav>
        </div>`
})


// 注册全局组件 - 自定义面包屑导航
Vue.component("custom-bootstrap", {
    props: ["one", "two"],
    template: `<div class="row wrapper border-bottom white-bg page-heading">
            <div class="col-lg-12 text-center">
                <h2>哪里有工程哪里就有包工侠</h2>
            </div>
            <div class="col-sm-4">
                <ol class="breadcrumb">
                    <li>
                        <a href="index.html">{{one}}</a>
                    </li>
                    <li class="active" v-if="two != ''">
                        <strong>{{two}}</strong>
                    </li>
                </ol>
            </div>
        </div>`
})

// 登录验证
$(document).ready(function () {
    //未登陆自动跳转到登陆页
    if (customSession == null) {
        location.href = "./login.html";
    }
});

// 创建 自定义菜单
var menu = new Vue({
    el:'#custom-menu'
})

// 创建 自定义页头
var menu = new Vue({
    el:'#custom-head'
})

// 创建 自定义面包屑导航
var menu = new Vue({
    el:'#custom-bootstrap'
})
