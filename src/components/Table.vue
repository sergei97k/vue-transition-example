<template>
    <el-card class="box-card">
        <el-table
            :data="comments"
            height="100vh"
            v-loading="loading"
            stripe>
            <el-table-column
               prop="name"
               label="Name"
               width="180">
            </el-table-column>
            <el-table-column
               prop="email"
               label="Email"
               width="180">
            </el-table-column>
            <el-table-column
               prop="body"
               label="Comment">
            </el-table-column>

            <div slot="empty"></div>
        </el-table>
    </el-card>
</template>

<script>
export default {
  name: "Table",
  props: {
    comments: {
      type: Array,
      required: true
    },
    loading: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style scoped>

</style>