<template>
	<el-dialog v-model="dialogFormVisible" :title="userInfo ? '编辑用户' : '新增用户'">
		<el-form :model="form">
			<el-form-item label="Promotion name" :label-width="formLabelWidth">
				<el-input v-model="form.name" autocomplete="off" />
				{{ userInfo && userInfo.id }}
			</el-form-item>
			<el-form-item label="Zones" :label-width="formLabelWidth">
				<el-select v-model="form.region" placeholder="Please select a zone">
					<el-option label="Zone No.1" value="shanghai" />
					<el-option label="Zone No.2" value="beijing" />
				</el-select>
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="closeDialog">Cancel</el-button>
				<el-button type="primary" @click="changeUserInfo">Confirm</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script lang="ts" name="AddEdit">
	import { computed, defineComponent, reactive, ref } from "vue";

	export default defineComponent({
		name: "TempScriptSetup",
		props: {
			data: {
				type: Object,
				default: () => {
					return {};
				},
			},
		},
		setup(props, context) {
			const dialogFormVisible = ref(false);
			const formLabelWidth = "140px";
			const openDialog = () => {
				dialogFormVisible.value = true;
			};
			const closeDialog = () => {
				dialogFormVisible.value = false;
			};
			const userInfo = computed(() => {
				return props.data;
			});
			const form = reactive({
				name: "",
				region: "",
				date1: "",
				date2: "",
				delivery: false,
				type: [],
				resource: "",
				desc: "",
			});
			const changeUserInfo = () => {
				closeDialog();
				context.emit("result", true);
			};
			return {
				dialogFormVisible,
				openDialog,
				closeDialog,
				form,
				formLabelWidth,
				userInfo,
				changeUserInfo,
			};
		},
	});
</script>

<style scoped lang="scss"></style>
