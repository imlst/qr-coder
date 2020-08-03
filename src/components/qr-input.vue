<template>
    <div class="qr-input">
        <div class="qr-input__inner">
            <input type="text" v-model="localValue" placeholder="Введите текст или ссылку" :maxlength="maxlength" @change="onChange">
            <font-awesome-icon v-if="localValue.length" class="qr-input__clear" :icon="['fas', 'trash']" @click="clearValue" />

            <div v-if="maxlength" :class="['qr-input__limit', { '--warning': valueAvailableLimit <= 10 }]">
                {{ valueAvailableLimit }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'QrInput',

    props: {
        value: {
            type: String,
            default: '',
        },

        maxlength: {
            type: Number,
        },
    },

    model: {
        prop: 'value',
        event: 'valueChange',
    },

    computed: {
        localValue: {
            get() {
                return this.value;
            },

            set(value) {
                this.$emit('valueChange', value);
            }
        },

        valueAvailableLimit() {
            return this.maxlength - this.localValue.length;
        },
    },

    methods: {
        onChange() {
            this.$emit('change', this.localValue);
        },

        clearValue() {
            this.$emit('change', '');
        },
    },
}
</script>
