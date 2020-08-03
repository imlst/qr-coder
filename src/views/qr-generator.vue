<template>
    <div class="content-tile --generator">
        <div class="content-tile__nav">
            <router-link to="/favorites">
                <span>Избранное</span>
                <span v-if="favoriteList.length" class="ui-tag">{{ favoriteList.length }}</span>
            </router-link>
        </div>

        <div class="qr-coder__code">
            <qrcode-vue v-if="string" :value="string" :size="340" level="H" />
            <img v-else class="qr-coder__placeholder" src="../assets/qrcode-placeholder.svg" alt="">
        </div>

        <div class="qr-coder__actions">
            <ul>
                <li>
                    <a v-if="string" href="javascript:void(0);" @click="toggleFavorite">
                        <font-awesome-icon v-if="inFavorite" class="qr-coder__favorite" :icon="['fas', 'star']" />
                        <font-awesome-icon v-else class="qr-coder__favorite" :icon="['far', 'star']" />
                        <span>{{ inFavorite ? 'Удалить из избранного' : 'Добавить в избранное' }}</span>
                    </a>

                    <div v-else class="blank-content" style="width: 180px;" />
                </li>
            </ul>
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
        // typedString: '',
    }),

    computed: {
        urlString() {
            return this.$route.query.string;
        },

        favoriteList() {
            return this.$store.getters.getFavorites;
        },

        inFavorite() {
            return this.favoriteList.includes(this.string);
        },
    },

    created() {
        this.string = this.urlString || '';
    },

    mounted() {
        this.$refs.mainInput.$el.querySelector('input').focus();
    },

    methods: {
        onChange(value) {
            this.string = value;

            this.$router.push({
                query: {
                    string: this.string,
                },
            });
        },

        toggleFavorite() {
            this.inFavorite
                ? this.$store.commit('removeFavorite', this.string)
                : this.$store.commit('addFavorite', this.string);

            localStorage.setItem('favoriteList', JSON.stringify(this.favoriteList));
        },
    },
}
</script>
