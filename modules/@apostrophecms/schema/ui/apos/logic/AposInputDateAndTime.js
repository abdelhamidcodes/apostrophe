import AposInputMixin from 'Modules/@apostrophecms/schema/mixins/AposInputMixin';
import dayjs from 'dayjs';

export default {
  mixins: [ AposInputMixin ],
  emits: [ 'return' ],
  data() {
    return {
      next: (this.value && this.value.data) || null,
      date: '',
      time: '',
      disabled: !this.field.required,
      invalid: false
    };
  },
  mounted () {
    this.initDateAndTime();
  },
  watch: {
    'field.required'(val) { // TODO: Make sure it works and is needed
      if (val) {
        this.disabled = false;
        if (this.date) {
          this.setDateAndTime();
        }
      }
    }
  },
  methods: {
    toggle() {
      this.disabled = !this.disabled;

      if (this.disabled) {
        this.next = null;
      }
    },
    validate(value) {
      if (this.invalid) {
        return 'invalid';
      }

      if (this.field.required && !this.next) {
        return 'required';
      }
    },
    initDateAndTime() {
      if (this.next) {
        this.date = dayjs(this.next).format('YYYY-MM-DD');
        this.time = dayjs(this.next).format('HH:mm:ss');
        this.disabled = false;
      }
    },
    setDateAndTime() {
      if (this.date) {
        this.invalid = false;
        this.next = dayjs(`${this.date} ${this.time}`.trim()).toISOString();
        this.disabled = false;
      } else {
        this.invalid = true;
        this.next = null;
        this.disabled = true;
      }
    }
  }

};
