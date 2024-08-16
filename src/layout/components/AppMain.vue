<template>
	<section class="app-main">
		<div class="navbar_content">
			<breadcrumb class="breadcrumb-container" />
		</div>
		<!-- <transition name="fade-transform" mode="out-in"> -->
		<keep-alive :max="1" :include="cachedViews">
			<router-view :key="key" />
		</keep-alive>
		<!-- </transition> -->
	</section>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
export default {
	name: 'AppMain',
	computed: {
		key() {
			return this.$route.path
		}
	},
	components: {
		Breadcrumb
	},
	data() {
		return {
			cachedViews: [
				'UnitManagementIndex',
				'TaskCenterIndex',
				'ToBeConfirmedList',
				'ConfirmingList',
				'AlumniDatabaseList',
				'Non-AlumniDatabaseList',
				'AlumniInformationIndex',
				'SmartTools',
				'UserManagementIndex',
				'AlumniType',
				'UnitType',
				'LabelPropertie',
				'IndustryType',
				'operationLog'
			]
		}
	}
}
</script>

<style scoped>
.app-main {
	flex: 1;
	/*120 = navbar  */
	/* height: 100vh; */
	width: 100%;
	position: relative;
	overflow: hidden;
	display: flex;
	flex-direction: column;
}

.fixed-header+.app-main {
	padding-top: calc(120px + 47px);
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
	.fixed-header {
		padding-right: 15px;
	}
}

.app-main {
	display: flex;
	.navbar_content{
		padding: 0 20px;
	}

	.container {
		flex: 1;
		max-width: 100%;
		overflow: hidden;

		.el-container {
			height: 100%;
		}
	}
}
</style>
