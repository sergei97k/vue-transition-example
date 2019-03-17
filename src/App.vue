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
                  <el-row type="flex" justify="center">
                      <el-button-group>
                          <el-button
                             v-for="tab in tabs"
                             :plain="activeTab !== tab.name"
                             type="primary"
                             :key="tab.name"
                             @click="onClick(tab.name)"
                          >
                              {{ tab.label }}
                          </el-button>
                      </el-button-group>
                  </el-row>

                  <transition
                     name="fade"
                     mode="out-in"
                     @after-leave="afterLeave"
                  >
                      <Table
                              v-if="dataLoad && comments.length"
                              :data="comments"
                              :loading="loading"
                      />
                  </transition>

                  <transition-group
                          name="fade-loader"
                          mode="out-in"
                          @after-leave="afterLeave"
                  >
                      <el-card
                              key="loading"
                              v-if="loading"
                              v-loading="loading"
                              class="table-loading"
                      />

                      <el-card
                              key="dataEmpty"
                              v-if="dataEmpty"
                              class="table-loading"
                      >
                          <el-row type="flex" justify="center" class="center">
                              <h2>No data</h2>
                          </el-row>
                      </el-card>
                  </transition-group>
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
    loading: true,
    dataLoad: false,
    dataEmpty: false
  }),
  mounted() {
    this.getData(true);
  },
  methods: {
    async getData(isFirstLoad) {
      this.comments = [];
      this.loading = !!isFirstLoad;
      this.dataLoad = false;
      this.dataEmpty = false;

      try {
        await setTimeout(async () => {
          this.comments = await axios.get('/comments');

          if (this.activeTab === 'third') {
            this.comments = [];
          }

          this.loading = false;
          this.dataLoad = true;
          this.dataEmpty = !this.comments.length;
        }, 2000);
      } catch (e) {
        console.error(e);
        this.loading = false;
      }
    },
    onClick(name) {
      this.activeTab = name;
      this.getData();
    },
    afterLeave() {
      const commentsLength = this.comments.length;

      // If data haven't gotten yet - show spinner
      if (!this.dataLoad && !commentsLength) {
        this.loading = true;
      }

      // If data have already gotten and data is empty - show empty results message
      if (this.dataLoad && !commentsLength) {
        this.dataEmpty = true;
      }

    }
  }
}
</script>

<style scoped>
    .el-container {
        max-width: 1140px;
        margin: 0 auto;
    }

    .el-header {
        margin: 30px 0;
    }

    .el-button-group {
        margin: 0 0 15px;
    }
    .el-button-group:after {
        content: "";
        position: absolute;
        left: 0;
        bottom: 15px;
        width: 100%;
        height: 2px;
        background-color: #e4e7ed;
        z-index: 1;
    }

    .table-loading,
    .center {
        height: 70vh;
    }

    .center {
        align-items: center;
        margin-top: -20px;
    }

    /* TRANSITION */
    .fade-enter,
    .fade-loader-enter {
        opacity: 0;
    }

    .fade-enter-active {
        transition: opacity 1s;
    }

    .fade-leave {

    }

    .fade-leave-active {
        transition: opacity 1s;
        opacity: 0;
    }

    .fade-loader-enter-active {
        transition: opacity 0.3s;
    }
    .fade-loader-leave-active {
        transition: opacity 0s;
        opacity: 0;
    }
</style>
