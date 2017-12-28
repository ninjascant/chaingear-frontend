<template>
<div>
	<el-form ref="form" :model="form" label-width="120px">
		<el-form-item label="Enter username">
			<el-popover
		    ref="supplyInfo"
		    placement="right-end"
		    width="300"
		    trigger="focus"
		    content="Enter total supply of token used in ICO">
		  </el-popover>
		  <el-input 
		    v-model="form.username"
		    v-popover:supplyInfo>
		  </el-input>
		</el-form-item>
	</el-form>
</div>
</template>