<template>
  <div class="card-body">
    <div class="card-text">
      <span>
        {{ currentTitle }}
      </span>
      <md-datepicker
        md-immediately
        v-model="selectedDate"
        :md-disabled-dates="disabledDates"
        >
        <label>
          {{ DUE_DATE_TEXT }}
        </label>
      </md-datepicker>
      <md-field>
        <label>
          {{ TASK_DESCRIPTION_TEXT }}
        </label>
        <md-input
          v-model="text"
          type="text"
          >
        </md-input>
      </md-field>
      <md-button
        class="fn-save"
        :disabled="disabled"
        @click="targetHandler"
        >
        {{ SAVE_BTN_TEXT }}
      </md-button>
      <md-button
        class="fn-cancel"
        @click="onCancel"
        >
        {{ CANCEL_BTN_TEXT }}
      </md-button>
    </div>
  </div>
</template>

<script>
import {
  mapActions,
} from 'vuex';

import {
  DUE_DATE_TEXT,
  ADD_TASK_TEXT,
  EDIT_TASK_TEXT,
  TASK_DESCRIPTION_TEXT,
  SAVE_BTN_TEXT,
  CANCEL_BTN_TEXT,
} from './constants';

export default {
  props: ['id', 'currentText', 'dueDate'],
  name: 'TaskForm',
  data() {
    return {
      text: this.currentText,
      selectedDate: this.dueDate,
      disabledDates: date => {
        return date.getTime() < Date.now()
      },
      DUE_DATE_TEXT,
      TASK_DESCRIPTION_TEXT,
      SAVE_BTN_TEXT,
      CANCEL_BTN_TEXT,
    };
  },
  computed: {
    currentTitle() {
      return this.id
        ? EDIT_TASK_TEXT
        : ADD_TASK_TEXT;
    },
    disabled() {
      return (!this.text || !this.selectedDate);
    },
  },
  methods: {
    ...mapActions([
      'addNewTask',
      'updateTask',
    ]),
    targetHandler() {
      return this.id
        ? this.editTask()
        : this.addTask();
    },
    addTask(){
      this.addNewTask({
        text: this.text,
        dueDate: this.selectedDate
      });

      this.$emit('update');
    },
    editTask() {
      this.updateTask({
        _id: this.id,
        text: this.text,
        dueDate: new Date(this.selectedDate).getTime(),
      });

      this.$emit('update');
    },
    onCancel() {
      this.$emit('update');
    }
  }
};
</script>
