<template>
  <div class="detail-row">
    <v-menu
      offset-y
      :nudge-right="40"
      transition="scale-transition"
      min-width="200"
      :close-on-content-click="false"
    >
      <v-icon
        class="detail-icon"
        slot="activator"
      >
      label</v-icon>
      <div class="menu-header">
        <div class="menu-title">
          Category
        </div>
      </div>
      <v-list>
        <v-list-tile
          @click="unflagAllCategories"
        >
          <v-list-tile-title>None</v-list-tile-title>
        </v-list-tile>
        <v-list-tile
          v-for="(category, i) in categories"
          :index="i"
          :key="category.id"
          @click="updateCategory(category)"
          class="category-menu-item"
        >
          <v-checkbox
            height="0"
            color="#00897b"
            :label="category.name"
            v-model="checkedArr"
            :value="category.name"
            :checked="checkedArr"
          >
          </v-checkbox>
        </v-list-tile>

      </v-list>
      <v-divider></v-divider>
      <v-list>
        <v-list-tile
          @click=""
        >
          <v-list-tile-title>New Category</v-list-tile-title>
        </v-list-tile>
        <v-list-tile
          @click=""
        >
          <v-list-tile-title>Manage Categories</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>

    <div class="detail" v-if="hasCategories">
      <div
        v-for="categoryName in todo.categories"
        :key="categoryName"
        class="chip category"
      >{{ categoryName }}
      </div>
    </div>

    <div class="detail not-set" v-else>Pick a Category</div>
  </div>
</template>

<script>
export default {
  props: [
    'todo',
    'categoryList'
  ],
  computed: {
    categories () {
      let categories = this.categoryList
      categories.forEach((category, i) => {
        categories[i].inUse = false
        if (this.todo.categories.length > 0 &&
        this.todo.categories.includes(category.name)) {
          categories[i].inUse = true
        }
      })
      return categories
    },
    hasCategories () {
      return this.todo.categories.length > 0
    },
    checkedArr () {
      return [...this.categories.filter(({ inUse }) => inUse).map(({ name }) => name)]
      // return true
    }
  },
  methods: {
    categoryCheck (category) {
      // let checked = this.todo.categories.indexOf(category)
      // console.log('categoryCheck:', checked)
      return true
    },
    updateCategory (category) {
      category.inUse = !category.inUse
      if (category.inUse) {
        this.todo.categories.push(category.name)
        this.checkedArr.push(category.name)
      } else {
        this.todo.categories = this.todo.categories.filter(name => name !== category.name)
        this.checkedArr = this.checkedArr.filter(name => name !== category.name)
      }
    },
    unflagAllCategories () {
      this.categories.forEach((category, i) => {
        this.categories[i].inUse = false
      })
      this.todo.categories = []
    }
  }
}
</script>

<style scoped>
.detail-row {
  display: flex;
  flex-direction: row;
  padding: 2px 0 3px;
}

.detail {
  padding-top: 2px;
}

.detail-icon {
  font-size: 25px;
  padding-right: 5px;
  padding-top: 1px;
  cursor: pointer;
  color: #555;
}

.not-set {
  font-size: 12px;
  margin-top: 3px;
  margin-left: 2px;
  color: rgb(99, 99, 99);
}

.menu-header {
  background-color: #555;
  color: white;
  height: 32px;
}

.menu-title {
  font-size: 18px;
  font-weight: 500;
  letter-spacing: .02em;
  text-align: left;
  padding: 3px 15px;
}

.chip {
  display: inline-block;
  border-radius: 10px;
  line-height: 18px;
  padding: 0 8px 0;
  margin-right: 4px;
  background-color: rgba(177, 216, 204, 0.733);
  font-size: .9em;
  position: relative;
  bottom: 1px;
}

>>>.v-list__tile {
  height: 32px;
}
</style>
