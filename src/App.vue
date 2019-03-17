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
                  <el-tabs v-model="activeTab" @tab-click="onTabChange">
                      <el-tab-pane
                        v-for="tab in tabs"
                        :key="tab.name"
                        :label="tab.label"
                        :name="tab.name"
                      >
                          <Table
                            v-if="tab.name === activeTab"
                            :comments="comments"
                            :loading="loading"
                          />
                      </el-tab-pane>
                  </el-tabs>
              </el-col>
          </el-row>
      </el-main>
  </el-container>
</template>

<script>
import axios from './utils/axios';
import { Table } from './components';

const TABS = [
  {
    name: 'first',
    label: 'First table'
  },
  {
    name: 'second',
    label: 'Second table'
  },
  {
    name: 'third',
    label: 'Third table'
  }
];

export default {
  name: 'app',
  components: {
    Table
  },
  data: () => ({
    activeTab: TABS[0].name,
    tabs: TABS,
    comments: [],
    loading: true
  }),
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      this.loading = true;

      try {
        await setTimeout(async () => {
          this.comments = await axios.get('/comments');
          this.loading = false;
        }, 2000);
      } catch (e) {
        console.error(e);
        this.loading = false;
      }
    },
    onTabChange() {
      this.getData();
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
