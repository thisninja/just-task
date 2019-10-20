<template>
  <div class="task-list">
    <div v-if="!newTaskForm">
      <md-button
        class="md-raised md-accent"
        @click="newTaskForm = !newTaskForm"
        >
          {{ CREATE_NEW_TASK_TEXT }}
      </md-button>
      <md-card
        class="card-wrapper"
        v-for="task in newestFirst"
        :key="task._id"
        >
        <md-card-header>
          <div class="md-title">
            <span v-if="task.completed">✔️</span>
            <span :class="{ completed: task.completed }">
              {{ task.text }}
            </span>
          </div>
          <div
            class="md-body-2"
            v-if="task.dueDate"
            >
              {{ DUE_DATE_TEXT }}: {{ getFormattedDate(task.dueDate) }}
          </div>
          <div
            class="md-body-2"
            v-if="task.completed"
            >
              {{ COMPLETED_AT_TEXT }}: {{ getFormattedDate(task.completedAt) }}
          </div>
        </md-card-header>

        <md-card-actions>
          <md-button
            class="md-primary"
            @click="onComplete(task)">
              {{ task.completed
                ? MARK_AS_UNCOMPLETED
                : MARK_AS_COMPLETED
              }}
          </md-button>
          <md-button
            v-if="!task.completed"
            @click="onEdit(task)"
            >
              {{ EDIT_BTN_TEXT }}
          </md-button>
          <md-button
            class="md-accent"
            @click="onDelete(task)"
            >
              {{ DELETE_BTN_TEXT }}
            </md-button>
        </md-card-actions>
      </md-card>
    </div>
  </div>
</template>

<script>
import {
  mapGetters,
  mapActions,
} from 'vuex';
import {
  COMPLETED_AT_TEXT,
  CREATE_NEW_TASK_TEXT,
  MARK_AS_COMPLETED,
  MARK_AS_UNCOMPLETED,
  DUE_DATE_TEXT,
  EDIT_BTN_TEXT,
  DELETE_BTN_TEXT,
} from './constants';

export default {
  name: 'Task',
  data() {
    return {
      newTaskForm: false,
      COMPLETED_AT_TEXT,
      CREATE_NEW_TASK_TEXT,
      MARK_AS_COMPLETED,
      MARK_AS_UNCOMPLETED,
      DUE_DATE_TEXT,
      EDIT_BTN_TEXT,
      DELETE_BTN_TEXT,
    };
  },
  created () {
    this.getTasks();
  },
  computed: {
    ...mapGetters([
      'tasks',
    ]),
    newestFirst() {
      return this.tasks.slice().reverse();
    },
  },
  methods: {
    ...mapActions([
      'getTasks',
      'updateTask',
      'deleteTaskById',
    ]),
    getFormattedDate(date) {
      return new Date(date).toDateString();
    },
    onDelete({ _id }) {
      this.deleteTaskById(_id);
    },
    onComplete({ _id, text, completed, dueDate }) {
      this.updateTask(
        {
          _id,
          text,
          completed: !completed,
          dueDate
        }
      );
    },
    onEdit({ _id, text }) {
      this.selectedId = _id;
      this.selectedText = text;
      this.editTaskForm = !this.editTaskForm;
    },
  }
};
</script>

<style lang="scss" scoped>
.task-list {
  min-width: 350px;
  max-width: 700px;

  .md-card.card-wrapper {
    margin: 10px;
  }

  .completed {
    text-decoration-line: line-through;
  }
}
</style>
