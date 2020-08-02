<template>
    <div class="centered-content">
        <div class="qrcode">
            <qrcode-vue v-if="typedString" :value="typedString" :size="220" level="H" />
            <img v-else class="qrcode__placeholder" src="../assets/qrcode-placeholder.svg" alt="">

            <i
                v-if="typedString"
                :class="['qrcode__favorite fa fa-star-o', { '--added': inFavorite }]"
                @click="toggleFavorite"
            />
        </div>

        <qr-input v-model="string" :maxlength="200" @change="onChange" ref="mainInput" />
    </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue'
import QrInput from "@/components/qr-input";

export default {
    name: 'QrGenerator',

    components: {
        QrcodeVue,
        QrInput,
    },

    data: () => ({
        string: '',
        typedString: '',
    }),

    computed: {
        urlString() {
            return this.$route.query.string;
        },

        inFavorite() {
            return this.$store.getters.getFavorites.includes(this.typedString);
        },
    },

    created() {
        this.string = this.urlString || '';
        this.typedString = this.string;
    },

    mounted() {
        this.$refs.mainInput.$el.querySelector('input').focus();
    },

    methods: {
        onChange(value) {
            this.string = value;
            this.typedString = value;

            this.$router.push({
                query: {
                    string: this.string,
                },
            });
        },

        toggleFavorite() {
            this.inFavorite
                ? this.$store.commit('removeFavorite', this.typedString)
                : this.$store.commit('addFavorite', this.typedString);
        },
    },
}
</script>
