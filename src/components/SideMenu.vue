<template>
	<el-col :span="22">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="1">
        <i class="el-icon-circle-plus-outline"></i>
        <span>Add new project</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-edit"></i>
        <span>Update a project</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-delete"></i>
        <span>Delete a project</span>
      </el-menu-item>
    </el-menu>
  </el-col>
</template>
<script>
import Vue from 'vue'
import {Component} from 'vue-property-decorator'

@Component({})
export default class SideMenu extends Vue {}
</script>