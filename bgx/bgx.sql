-- phpMyAdmin SQL Dump
-- version 4.8.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: 2018-05-15 10:21:37
-- 服务器版本： 5.6.39
-- PHP Version: 5.6.36

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bgx`
--

-- --------------------------------------------------------

--
-- 表的结构 `sys_acl`
--

CREATE TABLE `sys_acl` (
  `id` int(11) NOT NULL COMMENT '权限id',
  `name` varchar(20) NOT NULL DEFAULT '' COMMENT '权限名称',
  `url` varchar(100) NOT NULL DEFAULT '' COMMENT '请求的url',
  `role_id` int(11) NOT NULL COMMENT '角色id',
  `level` varchar(200) NOT NULL DEFAULT '' COMMENT '权限模块层级',
  `remark` varchar(200) DEFAULT '' COMMENT '备注',
  `operator` varchar(20) NOT NULL DEFAULT '' COMMENT '操作者',
  `operate_time` datetime DEFAULT NULL COMMENT '最后一次更新时间',
  `operate_ip` varchar(20) DEFAULT NULL COMMENT '最后一个更新者的ip地址'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 表的结构 `sys_advert`
--

CREATE TABLE `sys_advert` (
  `id` int(11) NOT NULL COMMENT '广告id',
  `d_id` int(11) NOT NULL COMMENT '图片类型id(数据字典id)',
  `title` varchar(50) NOT NULL COMMENT '标题',
  `url` varchar(255) NOT NULL COMMENT '图片路径',
  `remark` varchar(100) DEFAULT '' COMMENT '备注',
  `operation` varchar(20) DEFAULT '' COMMENT '操作者',
  `operation_time` datetime DEFAULT NULL COMMENT '操作时间',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 表的结构 `sys_audit`
--

CREATE TABLE `sys_audit` (
  `id` int(11) NOT NULL COMMENT '审核id',
  `type` int(5) NOT NULL COMMENT '需要审核的类型',
  `t_id` int(11) NOT NULL COMMENT '类型对应的主键id',
  `start_time` datetime DEFAULT NULL COMMENT '提交审核时间',
  `reviewer` varchar(20) DEFAULT NULL COMMENT '审核人',
  `reviewer_time` datetime DEFAULT NULL COMMENT '审核时间',
  `re_content` varchar(500) DEFAULT NULL COMMENT '审核意见',
  `status` int(2) NOT NULL COMMENT '审核状态1同意2不同意'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 表的结构 `sys_category`
--

CREATE TABLE `sys_category` (
  `id` int(11) NOT NULL COMMENT '菜单id',
  `pid` int(11) NOT NULL DEFAULT '0' COMMENT '父菜单id',
  `init_is` int(1) NOT NULL DEFAULT '1' COMMENT '1系统级菜单2自定义菜单',
  `c_title` varchar(30) DEFAULT '' COMMENT '菜单名称',
  `c_url` varchar(100) DEFAULT '' COMMENT '菜单url',
  `a_url` varchar(1000) DEFAULT '' COMMENT '权限url',
  `c_remark` varchar(100) DEFAULT '' COMMENT '备注',
  `c_sort` int(5) DEFAULT '99' COMMENT '排序权重',
  `operation` varchar(20) DEFAULT '' COMMENT '操作者',
  `operation_time` datetime DEFAULT NULL COMMENT '操作时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `sys_category`
--

INSERT INTO `sys_category` (`id`, `pid`, `init_is`, `c_title`, `c_url`, `a_url`, `c_remark`, `c_sort`, `operation`, `operation_time`) VALUES
(1, 0, 1, '系统权限管理', '', '', '', 1, '', NULL),
(2, 0, 1, '基础信息管理', '', '', '', 2, '', NULL),
(3, 0, 1, '企业信息管理', '', '', '', 3, '', NULL),
(4, 0, 1, '包工侠信息管理', '', '', '', 4, '', NULL),
(5, 0, 1, '劳务信息管理', '', '', '', 5, '', NULL),
(6, 0, 1, '业务信息管理', '', '', '', 6, '', NULL),
(7, 1, 1, '菜单信息管理', 'rbac-acl.html', 'Permismanager/rolemenuList', '', 1, '', NULL),
(8, 1, 1, '角色信息管理', 'rbac-role.html', 'Permismanager/roleList', '', 2, '', NULL),
(9, 1, 1, '用户信息管理', 'rbac-user.html', 'Permismanager/getUserlist', '', 3, '', NULL),
(10, 2, 1, '字典数据管理', 'base-dict.html', 'Basicmanager/getdatalist', '', 1, '', NULL),
(11, 2, 1, '图片广告管理', 'base-img.html', 'Basicmanager/getadvertlist', '', 2, '', NULL),
(12, 2, 1, '公共消息管理', 'base-message.html', 'Basicmanager/getmessagelist', '', 3, '', NULL),
(13, 2, 1, '项目类别管理', 'base-type.html', 'Basicmanager/getProtypelist', '', 4, '', NULL),
(14, 3, 1, '企业信息列表', 'company-list.html', 'Projectmanager/getCompanylist', '', 1, '', NULL),
(15, 3, 1, '企业邀请码管理', 'company-manage.html', 'Projectmanager/getInvitecodelist', '', 2, '', NULL),
(16, 3, 1, '项目信息列表', 'company-project.html', 'Projectmanager/getPorjectlist', '', 3, '', NULL),
(17, 4, 1, '包工侠信息列表', 'contractor-list.html', 'Bgxmanager/getBgxlist', '', 1, '', NULL),
(18, 4, 1, '包工侠项目列表', 'contractor-project.html', 'Bgxmanager/getBgxprojectlist', '', 2, '', NULL),
(19, 5, 1, '劳务信息列表', 'laborer-list.html', 'Workermanager/getWorkerlist', '', 1, '', NULL),
(20, 5, 1, '劳务项目列表', 'laborer-project.html', 'Workermanager/getWorkerprojectlist', '', 2, '', NULL),
(21, 6, 1, '企业包工侠合同列表', 'operation-contractor.html', 'Businmanager/getComanycontractlist', '', 1, '', NULL),
(22, 6, 1, '包工侠劳务合同列表', 'operation-laborer.html', 'Businmanager/getBgxcontractlist', '', 2, '', NULL),
(23, 6, 1, '后台审核记录列表', 'operation-audit.html', 'Businmanager/auditList', '', 3, '', NULL);

-- --------------------------------------------------------

--
-- 表的结构 `sys_datadict`
--

CREATE TABLE `sys_datadict` (
  `id` int(11) NOT NULL COMMENT '字典id',
  `t_code` varchar(20) NOT NULL COMMENT '字典类型编码',
  `t_name` varchar(30) NOT NULL COMMENT '字典类型名称',
  `d_code` varchar(20) NOT NULL COMMENT '字典编码',
  `d_name` varchar(30) NOT NULL COMMENT '字典名称',
  `operation` varchar(20) DEFAULT '' COMMENT '操作者',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `d_fieldone` varchar(30) DEFAULT '' COMMENT '扩展字段1',
  `d_fieltwo` varchar(30) DEFAULT '' COMMENT '扩展字段2',
  `delete_time` int(10) DEFAULT NULL COMMENT '删除时间',
  `init_is` tinyint(1) DEFAULT '1' COMMENT '是否为系统类型1否2是'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 表的结构 `sys_invitecode`
--

CREATE TABLE `sys_invitecode` (
  `id` int(11) NOT NULL COMMENT '邀请码id',
  `i_code` char(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '邀请码',
  `c_name` varchar(50) DEFAULT '' COMMENT '企业名称',
  `status` int(1) NOT NULL DEFAULT '1' COMMENT '邀请码状态1未使用2已使用',
  `use_time` datetime DEFAULT NULL COMMENT '邀请码使用时间',
  `operation` varchar(20) DEFAULT '' COMMENT '创建人',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 表的结构 `sys_message`
--

CREATE TABLE `sys_message` (
  `id` int(11) NOT NULL COMMENT '消息id',
  `d_id` int(11) NOT NULL COMMENT '消息类型id（对应字典表）',
  `title` varchar(50) NOT NULL COMMENT '标题',
  `content` text NOT NULL COMMENT '消息内容',
  `operation` varchar(20) DEFAULT NULL COMMENT '发布者',
  `create_time` datetime DEFAULT NULL COMMENT '发布时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 表的结构 `sys_protype`
--

CREATE TABLE `sys_protype` (
  `id` int(11) NOT NULL COMMENT '类别id',
  `d_id` int(11) NOT NULL COMMENT '一级类型id（数据字典）',
  `name` varchar(255) NOT NULL COMMENT '二级类别名称',
  `operation` varchar(20) DEFAULT '' COMMENT '创建人',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 表的结构 `sys_role`
--

CREATE TABLE `sys_role` (
  `id` int(11) NOT NULL COMMENT '角色id',
  `type` int(1) DEFAULT '1' COMMENT '废弃的字段',
  `name` varchar(20) NOT NULL,
  `code` varchar(40) DEFAULT '' COMMENT '角色编码',
  `status` int(11) NOT NULL DEFAULT '1' COMMENT '状态，1：可用，0：冻结',
  `remark` varchar(200) DEFAULT '' COMMENT '备注',
  `operator` varchar(20) NOT NULL DEFAULT '' COMMENT '操作者',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `operate_time` datetime NOT NULL COMMENT '最后一次更新的时间',
  `operate_ip` varchar(20) NOT NULL DEFAULT '' COMMENT '最后一次更新者的ip地址'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 表的结构 `sys_role_acl`
--

CREATE TABLE `sys_role_acl` (
  `id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL COMMENT '角色id',
  `acl_id` int(11) NOT NULL COMMENT '权限id',
  `operator` varchar(20) NOT NULL DEFAULT '' COMMENT '操作者',
  `operate_time` datetime NOT NULL COMMENT '最后一次更新的时间',
  `operate_ip` varchar(200) NOT NULL DEFAULT '' COMMENT '最后一次更新者的ip'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 表的结构 `sys_role_user`
--

CREATE TABLE `sys_role_user` (
  `id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL COMMENT '角色id',
  `user_id` int(11) NOT NULL COMMENT '用户id',
  `operator` varchar(20) NOT NULL DEFAULT '' COMMENT '操作者',
  `operate_time` datetime NOT NULL COMMENT '最后一次更新的时间',
  `operate_ip` varchar(20) NOT NULL DEFAULT '' COMMENT '最后一次更新者的ip地址'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 表的结构 `sys_user`
--

CREATE TABLE `sys_user` (
  `id` int(11) NOT NULL COMMENT '用户id',
  `role_id` int(11) NOT NULL DEFAULT '99999' COMMENT '用户对应的角色id',
  `account` varchar(30) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '用户账号',
  `username` varchar(20) NOT NULL DEFAULT '' COMMENT '用户名称',
  `telephone` varchar(13) NOT NULL DEFAULT '' COMMENT '手机号',
  `mail` varchar(20) NOT NULL DEFAULT '' COMMENT '邮箱',
  `password` varchar(40) NOT NULL DEFAULT '' COMMENT '加密后的密码',
  `status` int(11) NOT NULL DEFAULT '1' COMMENT '状态，1：正常，0：冻结状态，-1：删除',
  `birthday` date DEFAULT NULL COMMENT '生日',
  `sex` int(2) NOT NULL DEFAULT '1' COMMENT '用户性别1男2女',
  `address` varchar(50) DEFAULT '',
  `remark` varchar(200) DEFAULT '' COMMENT '备注',
  `operator` varchar(20) NOT NULL DEFAULT '' COMMENT '操作者',
  `operate_time` datetime NOT NULL COMMENT '最后一次更新时间',
  `operate_ip` varchar(20) NOT NULL DEFAULT '' COMMENT '最后一次更新者的ip地址',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 表的结构 `tb_bespeak`
--

CREATE TABLE `tb_bespeak` (
  `id` int(11) NOT NULL COMMENT '预约id',
  `b_identity` int(11) NOT NULL COMMENT '推送预约者身份',
  `b_id` int(11) NOT NULL COMMENT '推送预约者id',
  `bs_identity` int(11) NOT NULL COMMENT '被推送预约者身份',
  `bs_id` int(11) NOT NULL COMMENT '被推送预约者id',
  `p_id` int(11) DEFAULT NULL COMMENT '项目id',
  `lp_id` int(11) DEFAULT NULL COMMENT '包工侠项目id',
  `wp_id` int(11) DEFAULT NULL COMMENT '劳务项目id',
  `b_name` varchar(256) DEFAULT NULL COMMENT '项目名字',
  `b_css` int(11) DEFAULT NULL COMMENT '1推项目，2推包工侠（劳务',
  `b_type` int(11) NOT NULL COMMENT '1推送2预约',
  `b_status` int(11) NOT NULL COMMENT '预约状态',
  `use_time` datetime NOT NULL COMMENT '操作时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='预约表';

-- --------------------------------------------------------

--
-- 表的结构 `tb_company`
--

CREATE TABLE `tb_company` (
  `c_id` bigint(12) NOT NULL COMMENT '公司id',
  `c_name` varchar(100) CHARACTER SET utf8mb4 NOT NULL DEFAULT '' COMMENT '公司名称',
  `c_txurl` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '企业头像',
  `c_province` varchar(32) CHARACTER SET utf8mb4 NOT NULL COMMENT '省',
  `c_city` varchar(32) CHARACTER SET utf8mb4 NOT NULL COMMENT '市',
  `c_addr` varchar(500) CHARACTER SET utf8mb4 NOT NULL DEFAULT '' COMMENT '公司地址',
  `c_legal_person` varchar(50) CHARACTER SET utf8mb4 NOT NULL DEFAULT '' COMMENT '法人名称',
  `c_regi_capital` float(14,2) DEFAULT NULL COMMENT '注册资金',
  `c_contact_name` varchar(50) CHARACTER SET utf8mb4 NOT NULL DEFAULT '' COMMENT '联系人姓名',
  `c_contact_tel` varchar(20) CHARACTER SET utf8mb4 NOT NULL DEFAULT '' COMMENT '联系电话',
  `c_contact_photo` varchar(1024) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '联系人照片',
  `c_id_card` varchar(20) CHARACTER SET utf8mb4 NOT NULL DEFAULT '' COMMENT '身份证号',
  `c_business_license` varchar(200) CHARACTER SET utf8mb4 DEFAULT '' COMMENT '营业执照',
  `c_safety_frod_permit` varchar(200) CHARACTER SET utf8mb4 DEFAULT '' COMMENT '安全生产许可证',
  `c_account_open_cert` varchar(200) CHARACTER SET utf8mb4 NOT NULL DEFAULT '' COMMENT '开户证明',
  `c_unif_soci_info` varchar(64) CHARACTER SET utf8mb4 NOT NULL COMMENT '统一社会信息代码',
  `i_code` char(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '邀请码',
  `c_remark` varchar(1000) CHARACTER SET utf8mb4 NOT NULL DEFAULT '' COMMENT '备注',
  `c_status` int(5) NOT NULL DEFAULT '101' COMMENT '公司状态',
  `c_operator` varchar(20) CHARACTER SET utf8mb4 NOT NULL DEFAULT '' COMMENT '操作者',
  `login_time` datetime NOT NULL COMMENT '登录时间',
  `operate_time` datetime NOT NULL COMMENT '最后一次更新时间',
  `operate_ip` varchar(200) CHARACTER SET utf8mb4 NOT NULL DEFAULT '' COMMENT '最后一次更新者的ip'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- 表的结构 `tb_contract`
--

CREATE TABLE `tb_contract` (
  `id` int(11) NOT NULL COMMENT '合同id',
  `ht_name` varchar(64) DEFAULT NULL COMMENT '包工侠名字',
  `ht_url` varchar(2000) NOT NULL COMMENT '合同路径',
  `ht_title` int(11) DEFAULT NULL COMMENT '拒绝内容',
  `up_time` datetime NOT NULL COMMENT '时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='合同表';

-- --------------------------------------------------------

--
-- 表的结构 `tb_labor`
--

CREATE TABLE `tb_labor` (
  `l_id` int(12) NOT NULL COMMENT '包工侠id',
  `l_num` varchar(32) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '包工侠编号',
  `l_name` varchar(200) CHARACTER SET utf8mb4 NOT NULL DEFAULT '' COMMENT '包工侠名称',
  `l_head_url` varchar(200) CHARACTER SET utf8mb4 DEFAULT '' COMMENT '头像url',
  `l_id_card` varchar(18) COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT '身份证号码',
  `l_age` int(2) NOT NULL COMMENT '年龄',
  `l_province` varchar(32) CHARACTER SET utf8mb4 NOT NULL COMMENT '省份',
  `l_city` varchar(32) CHARACTER SET utf8mb4 NOT NULL COMMENT '市',
  `l_address` varchar(255) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '常住地址',
  `l_work_time` float(8,2) DEFAULT NULL COMMENT '从业时间',
  `l_tel` varchar(20) CHARACTER SET utf8mb4 NOT NULL DEFAULT '' COMMENT '联系电话',
  `l_team_num` int(8) DEFAULT NULL COMMENT '队伍人数',
  `l_work_address` varchar(1000) CHARACTER SET utf8mb4 NOT NULL COMMENT '可工作地',
  `l_work_type` int(11) NOT NULL DEFAULT '0' COMMENT '工作类型(id)对应字典表',
  `l_work_kingdom` varchar(255) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '工程领域',
  `l_achi` int(11) DEFAULT '0' COMMENT '业绩数',
  `l_money` float DEFAULT '0' COMMENT '涉及金额',
  `l_creditrating` int(11) DEFAULT '601' COMMENT '信用等级',
  `l_remark` varchar(1000) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '备注',
  `l_status` char(3) CHARACTER SET utf8mb4 DEFAULT '101' COMMENT '状态',
  `l_pushpro` int(11) DEFAULT '1' COMMENT '推送项目给包工侠(0不允许，1允许)',
  `l_operator` varchar(20) CHARACTER SET utf8mb4 DEFAULT '' COMMENT '操作者',
  `login_time` datetime NOT NULL COMMENT '登录时间',
  `operate_time` datetime NOT NULL COMMENT '最后一次操作的时间',
  `operate_ip` varchar(200) CHARACTER SET utf8mb4 NOT NULL DEFAULT '' COMMENT '最后一次操作者的ip'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- 表的结构 `tb_labor_project`
--

CREATE TABLE `tb_labor_project` (
  `la_id` bigint(12) NOT NULL COMMENT '包工侠项目id',
  `la_project_id` bigint(12) NOT NULL COMMENT '企业项目id',
  `la_labor_id` bigint(12) NOT NULL COMMENT '包工侠id',
  `la_is_push_worker` char(1) CHARACTER SET utf8mb4 NOT NULL DEFAULT '0' COMMENT '推劳务（1是，0否）',
  `ct_id` int(11) DEFAULT '0' COMMENT '合同id(对应合同表)',
  `la_opt_status` int(5) DEFAULT '304' COMMENT '包工侠项目状态',
  `la_remark` varchar(1000) CHARACTER SET utf8mb4 DEFAULT '' COMMENT '备注',
  `la_operator` varchar(20) CHARACTER SET utf8mb4 DEFAULT '' COMMENT '操作者',
  `operate_time` datetime NOT NULL COMMENT '最后一次操作的时间',
  `operate_ip` varchar(200) CHARACTER SET utf8mb4 NOT NULL DEFAULT '' COMMENT '最后一次操作者的ip'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- 表的结构 `tb_log`
--

CREATE TABLE `tb_log` (
  `id` int(11) NOT NULL,
  `up_type` int(11) NOT NULL COMMENT '提交人身份',
  `up_id` int(11) NOT NULL COMMENT '提交人id',
  `pro_id` int(11) NOT NULL COMMENT '查看者项目id',
  `log_text` varchar(1000) NOT NULL COMMENT '日志内容',
  `log_time` datetime NOT NULL COMMENT '日志时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='日志表';

-- --------------------------------------------------------

--
-- 表的结构 `tb_project`
--

CREATE TABLE `tb_project` (
  `p_id` bigint(12) NOT NULL COMMENT '企业项目id',
  `p_number` varchar(16) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '项目编号',
  `p_companyid` int(11) DEFAULT NULL COMMENT '公司id',
  `p_name` varchar(500) CHARACTER SET utf8mb4 NOT NULL DEFAULT '' COMMENT '企业项目名称',
  `p_type` int(11) NOT NULL COMMENT '工程类型(字典表id)',
  `start_time` date NOT NULL COMMENT '项目开始时间',
  `end_time` date NOT NULL COMMENT '项目结束时间',
  `p_province` varchar(64) CHARACTER SET utf8mb4 NOT NULL COMMENT '省份',
  `p_city` varchar(64) CHARACTER SET utf8mb4 NOT NULL COMMENT '市',
  `p_addr` varchar(500) CHARACTER SET utf8mb4 NOT NULL DEFAULT '' COMMENT '项目地址',
  `p_num` int(11) DEFAULT NULL COMMENT '施工人数',
  `p_scale` varchar(100) CHARACTER SET utf8mb4 DEFAULT '' COMMENT '项目规模',
  `p_column_price` double(18,2) NOT NULL COMMENT '栏标价',
  `p_contract_com` varchar(255) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '分包单位',
  `p_provepeople` varchar(64) CHARACTER SET utf8mb4 NOT NULL COMMENT '证明人',
  `p_provephone` varchar(11) COLLATE utf8_unicode_ci NOT NULL COMMENT '证明人电话',
  `p_contract` varchar(2000) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '合同url',
  `p_is_push_project` char(1) CHARACTER SET utf8mb4 NOT NULL DEFAULT '0' COMMENT '推项目(1是，0否)',
  `p_is_push_labor` char(1) CHARACTER SET utf8mb4 NOT NULL DEFAULT '0' COMMENT '推包工侠（1是，0否）',
  `p_remark` varchar(1000) CHARACTER SET utf8mb4 NOT NULL DEFAULT '' COMMENT '备注',
  `p_status` int(5) NOT NULL DEFAULT '201' COMMENT '项目状态',
  `p_operator` varchar(20) CHARACTER SET utf8mb4 NOT NULL DEFAULT '' COMMENT '操作者',
  `operate_time` datetime NOT NULL COMMENT '最后一次更新的时间',
  `operate_ip` varchar(200) CHARACTER SET utf8mb4 NOT NULL DEFAULT '' COMMENT '最后一次更新者的ip'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- 表的结构 `tb_push_project`
--

CREATE TABLE `tb_push_project` (
  `id` int(11) NOT NULL COMMENT '主键id',
  `type_id` int(11) NOT NULL DEFAULT '1' COMMENT 'id类型（1企业推约包工侠，2包工侠推约劳务）',
  `np_id` int(11) DEFAULT NULL COMMENT '项目id(包工侠项目id)',
  `name_id` int(11) NOT NULL COMMENT '包工侠id(劳务id)',
  `push_number` varchar(16) NOT NULL COMMENT '包工侠编号',
  `push_name` varchar(32) NOT NULL COMMENT '包工侠名字',
  `p_name` varchar(64) DEFAULT NULL COMMENT '项目名称',
  `push_phone` varchar(11) NOT NULL COMMENT '手机号',
  `push_con` int(11) NOT NULL COMMENT '信用等级',
  `push_type` int(11) NOT NULL COMMENT '类型（1系统推送，2主动预约）',
  `push_css` int(11) DEFAULT '1' COMMENT '1推项目（包工侠项目），2推包工侠（劳务）',
  `push_status` int(11) NOT NULL COMMENT '推送预约状态',
  `use_time` datetime NOT NULL COMMENT '操作时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 表的结构 `tb_review`
--

CREATE TABLE `tb_review` (
  `id` int(11) NOT NULL,
  `identity` int(11) NOT NULL COMMENT '评论人身份',
  `commentator` int(11) NOT NULL COMMENT '评论人id',
  `reidentity` int(11) NOT NULL COMMENT '被评论人身份',
  `recommentator` int(11) NOT NULL COMMENT '被评论人id',
  `pro_id` int(11) NOT NULL COMMENT '项目id',
  `firstscore` int(11) DEFAULT NULL COMMENT '第一次评论得分',
  `firstcomment` varchar(2000) DEFAULT NULL COMMENT '第一次评论内容',
  `firsttime` datetime DEFAULT NULL COMMENT '第一次评论时间',
  `endscore` int(11) NOT NULL COMMENT '最后一次得分',
  `endcomment` varchar(2000) DEFAULT NULL COMMENT '最后一次评论内容',
  `endtime` datetime DEFAULT NULL COMMENT '最后一次评论时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='评论表';

-- --------------------------------------------------------

--
-- 表的结构 `tb_user`
--

CREATE TABLE `tb_user` (
  `u_id` bigint(12) NOT NULL COMMENT '用户id',
  `u_accounrt` varchar(20) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '用户账号',
  `u_password` varchar(64) CHARACTER SET utf8mb4 NOT NULL DEFAULT '' COMMENT '用户密码',
  `u_name` varchar(50) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '用户姓名',
  `u_tel` char(50) CHARACTER SET utf8mb4 NOT NULL DEFAULT '' COMMENT '用户手机号',
  `u_remark` varchar(1000) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '用户备注',
  `u_status` char(3) CHARACTER SET utf8mb4 NOT NULL DEFAULT '100' COMMENT '用户状态',
  `u_operator` varchar(20) CHARACTER SET utf8mb4 NOT NULL DEFAULT '' COMMENT '操作者',
  `operate_time` datetime NOT NULL COMMENT '最后一次更新时间',
  `operate_ip` varchar(200) CHARACTER SET utf8mb4 NOT NULL COMMENT '最后一次更新的地址'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- 表的结构 `tb_worker`
--

CREATE TABLE `tb_worker` (
  `w_id` bigint(12) NOT NULL COMMENT '劳务信息id',
  `w_num` varchar(16) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '劳务编号',
  `w_name` varchar(20) CHARACTER SET utf8mb4 NOT NULL DEFAULT '' COMMENT '姓名',
  `w_age` int(11) NOT NULL COMMENT '年龄',
  `w_id_card` varchar(20) CHARACTER SET utf8mb4 NOT NULL DEFAULT '' COMMENT '身份证号码',
  `w_tel` varchar(11) CHARACTER SET utf8mb4 NOT NULL COMMENT '劳务手机号',
  `w_head_url` varchar(200) CHARACTER SET utf8mb4 NOT NULL DEFAULT '' COMMENT '头像url',
  `w_province` varchar(64) CHARACTER SET utf8mb4 NOT NULL COMMENT '省份',
  `w_city` varchar(64) CHARACTER SET utf8mb4 NOT NULL COMMENT '市',
  `w_work_time` float(8,2) NOT NULL COMMENT '从业年限',
  `w_address` varchar(255) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '常住地址',
  `w_workaddr` varchar(255) CHARACTER SET utf8mb4 NOT NULL COMMENT '可施工地',
  `w_cons_field` varchar(500) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '施工工种',
  `w_work_kingdom` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '可施工工程领域',
  `w_achi` int(11) NOT NULL DEFAULT '0' COMMENT '业绩',
  `w_money` int(11) NOT NULL DEFAULT '0' COMMENT '涉及金额',
  `w_minimum` int(11) DEFAULT '0' COMMENT '最低薪资',
  `w_maximum` int(11) DEFAULT '0' COMMENT '最高薪资',
  `w_creditrating` int(11) NOT NULL DEFAULT '588' COMMENT '信用等级',
  `w_remark` varchar(1000) CHARACTER SET utf8mb4 DEFAULT '' COMMENT '备注',
  `w_status` int(5) NOT NULL DEFAULT '101' COMMENT '劳务状态',
  `w_pushpro` int(11) NOT NULL DEFAULT '1' COMMENT '推送项目给劳务(0不推送，1允许推送)',
  `w_operator` varchar(20) CHARACTER SET utf8mb4 DEFAULT '' COMMENT '操作者',
  `login_time` datetime NOT NULL COMMENT '登录时间',
  `operate_time` datetime NOT NULL COMMENT '最后一次操作的时间',
  `operate_ip` varchar(200) CHARACTER SET utf8mb4 NOT NULL DEFAULT '' COMMENT '最后一次操作者的ip'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- 表的结构 `tb_worker_project`
--

CREATE TABLE `tb_worker_project` (
  `wo_id` bigint(12) NOT NULL COMMENT '劳务项目信息id',
  `wo_project_id` bigint(12) NOT NULL COMMENT '项目信息id',
  `l_p_id` int(5) DEFAULT NULL COMMENT '对应的包工侠项目id',
  `wo_worker_id` bigint(12) NOT NULL COMMENT '劳务id',
  `ct_id` int(11) NOT NULL DEFAULT '0' COMMENT '包工侠劳务合同id',
  `wo_remark` varchar(1000) CHARACTER SET utf8mb4 DEFAULT '' COMMENT '备注',
  `wo_status` int(5) NOT NULL DEFAULT '304' COMMENT '劳务项目状态',
  `wo_operator` varchar(20) CHARACTER SET utf8mb4 DEFAULT '' COMMENT '操作者',
  `operate_time` datetime NOT NULL COMMENT '最后一次操作的时间',
  `operate_ip` varchar(200) CHARACTER SET utf8mb4 NOT NULL DEFAULT '' COMMENT '最后一次操作者的ip'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sys_acl`
--
ALTER TABLE `sys_acl`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sys_advert`
--
ALTER TABLE `sys_advert`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sys_audit`
--
ALTER TABLE `sys_audit`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sys_category`
--
ALTER TABLE `sys_category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sys_datadict`
--
ALTER TABLE `sys_datadict`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sys_invitecode`
--
ALTER TABLE `sys_invitecode`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sys_message`
--
ALTER TABLE `sys_message`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sys_protype`
--
ALTER TABLE `sys_protype`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sys_role`
--
ALTER TABLE `sys_role`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sys_role_acl`
--
ALTER TABLE `sys_role_acl`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sys_role_user`
--
ALTER TABLE `sys_role_user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sys_user`
--
ALTER TABLE `sys_user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_bespeak`
--
ALTER TABLE `tb_bespeak`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_company`
--
ALTER TABLE `tb_company`
  ADD PRIMARY KEY (`c_id`);

--
-- Indexes for table `tb_contract`
--
ALTER TABLE `tb_contract`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_labor`
--
ALTER TABLE `tb_labor`
  ADD PRIMARY KEY (`l_id`);

--
-- Indexes for table `tb_labor_project`
--
ALTER TABLE `tb_labor_project`
  ADD PRIMARY KEY (`la_id`);

--
-- Indexes for table `tb_log`
--
ALTER TABLE `tb_log`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_project`
--
ALTER TABLE `tb_project`
  ADD PRIMARY KEY (`p_id`);

--
-- Indexes for table `tb_push_project`
--
ALTER TABLE `tb_push_project`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_review`
--
ALTER TABLE `tb_review`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_user`
--
ALTER TABLE `tb_user`
  ADD PRIMARY KEY (`u_id`);

--
-- Indexes for table `tb_worker`
--
ALTER TABLE `tb_worker`
  ADD PRIMARY KEY (`w_id`);

--
-- Indexes for table `tb_worker_project`
--
ALTER TABLE `tb_worker_project`
  ADD PRIMARY KEY (`wo_id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `sys_acl`
--
ALTER TABLE `sys_acl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '权限id';

--
-- 使用表AUTO_INCREMENT `sys_advert`
--
ALTER TABLE `sys_advert`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '广告id', AUTO_INCREMENT=6;

--
-- 使用表AUTO_INCREMENT `sys_audit`
--
ALTER TABLE `sys_audit`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '审核id', AUTO_INCREMENT=78;

--
-- 使用表AUTO_INCREMENT `sys_category`
--
ALTER TABLE `sys_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '菜单id', AUTO_INCREMENT=24;

--
-- 使用表AUTO_INCREMENT `sys_datadict`
--
ALTER TABLE `sys_datadict`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '字典id';

--
-- 使用表AUTO_INCREMENT `sys_invitecode`
--
ALTER TABLE `sys_invitecode`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '邀请码id', AUTO_INCREMENT=125;

--
-- 使用表AUTO_INCREMENT `sys_message`
--
ALTER TABLE `sys_message`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '消息id', AUTO_INCREMENT=2;

--
-- 使用表AUTO_INCREMENT `sys_protype`
--
ALTER TABLE `sys_protype`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '类别id', AUTO_INCREMENT=15;

--
-- 使用表AUTO_INCREMENT `sys_role`
--
ALTER TABLE `sys_role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '角色id';

--
-- 使用表AUTO_INCREMENT `sys_role_acl`
--
ALTER TABLE `sys_role_acl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `sys_role_user`
--
ALTER TABLE `sys_role_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `sys_user`
--
ALTER TABLE `sys_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户id';

--
-- 使用表AUTO_INCREMENT `tb_bespeak`
--
ALTER TABLE `tb_bespeak`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '预约id', AUTO_INCREMENT=16;

--
-- 使用表AUTO_INCREMENT `tb_company`
--
ALTER TABLE `tb_company`
  MODIFY `c_id` bigint(12) NOT NULL AUTO_INCREMENT COMMENT '公司id', AUTO_INCREMENT=3;

--
-- 使用表AUTO_INCREMENT `tb_contract`
--
ALTER TABLE `tb_contract`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '合同id', AUTO_INCREMENT=9;

--
-- 使用表AUTO_INCREMENT `tb_labor`
--
ALTER TABLE `tb_labor`
  MODIFY `l_id` int(12) NOT NULL AUTO_INCREMENT COMMENT '包工侠id', AUTO_INCREMENT=4;

--
-- 使用表AUTO_INCREMENT `tb_labor_project`
--
ALTER TABLE `tb_labor_project`
  MODIFY `la_id` bigint(12) NOT NULL AUTO_INCREMENT COMMENT '包工侠项目id', AUTO_INCREMENT=8;

--
-- 使用表AUTO_INCREMENT `tb_log`
--
ALTER TABLE `tb_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `tb_project`
--
ALTER TABLE `tb_project`
  MODIFY `p_id` bigint(12) NOT NULL AUTO_INCREMENT COMMENT '企业项目id', AUTO_INCREMENT=4;

--
-- 使用表AUTO_INCREMENT `tb_push_project`
--
ALTER TABLE `tb_push_project`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键id';

--
-- 使用表AUTO_INCREMENT `tb_review`
--
ALTER TABLE `tb_review`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- 使用表AUTO_INCREMENT `tb_user`
--
ALTER TABLE `tb_user`
  MODIFY `u_id` bigint(12) NOT NULL AUTO_INCREMENT COMMENT '用户id', AUTO_INCREMENT=20;

--
-- 使用表AUTO_INCREMENT `tb_worker`
--
ALTER TABLE `tb_worker`
  MODIFY `w_id` bigint(12) NOT NULL AUTO_INCREMENT COMMENT '劳务信息id', AUTO_INCREMENT=2;

--
-- 使用表AUTO_INCREMENT `tb_worker_project`
--
ALTER TABLE `tb_worker_project`
  MODIFY `wo_id` bigint(12) NOT NULL AUTO_INCREMENT COMMENT '劳务项目信息id', AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
