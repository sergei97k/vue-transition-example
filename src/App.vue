<template>
  <el-container>
      <el-header>
          <el-row type="flex" justify="center">
              <h1>Vue Transition Example</h1>
          </el-row>
      </el-header>
      <el-main>
          <el-row>
              <el-col :span="24">
                  <div class="grid-content bg-purple-dark">
                      <Table :comments="comments" />
                  </div>
              </el-col>
          </el-row>
      </el-main>
  </el-container>
</template>

<script>
import axios from './utils/axios';
import { Table } from './components'

export default {
  name: 'app',
  components: {
    Table
  },
  data: () => ({
    comments: []
  }),
  async mounted() {
    try {
      this.comments = await axios.get('/comments');
    } catch (e) {
      console.error(e);
    }
  }
}
</script>

<style scoped>
    .el-container {
        width: 1140px;
        margin: 0 auto;
    }

    .el-header {
        margin: 30px 0;
    }
</style>
