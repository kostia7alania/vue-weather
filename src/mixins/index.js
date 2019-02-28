export const localDataMixin = {
    methods: {
        initLocalStorage(name) {
            if (localStorage) {
                if (localStorage.getItem(name)) {
                    let local = JSON.parse(localStorage.getItem(name));
                    Object.keys(local).forEach(key => (this[key] = local[key]));
                }
            } else {
                console.log("localStorage isn't support!");
            }
        },

        setLocalStorage(name) {
            window.t = this;
            if (localStorage) {
                localStorage.setItem(name, JSON.stringify(this._data));
            } else {
                console.log("localStorage isn't support!");
            }
        }
    }
};




export const VuexMixin = {
    methods: {
        initVuexStorage() {
            if (localStorage) {
                console.log('READ')
                let name = 'VuexStore';
                if (localStorage.getItem(name)) {
                    let local = JSON.parse(localStorage.getItem(name));
                    Object.keys(local).forEach(key => {
                        console.log(this.$store.state, key, local[key])
                        this.$set(this.$store.state, key, local[key])
                    });
                }
            } else {
                console.warn("localStorage isn't support!");
            }
        },

        setVuex() {
            if (localStorage) {
                localStorage.setItem('VuexStore', JSON.stringify({
                    ...this.$store.state,
                    favorites: {
                        ...this.$store.state.favorites
                    }
                }));
            } else {
                console.warn("localStorage isn't support!");
            }
        }
    }
};




export const globalMixin = {
    mixins: [localDataMixin, VuexMixin],
    data() {
        return { }
    },
    methods: {
        getTime() {
            let d = new Date;
            let sec = d.getSeconds();
            sec = sec<10?'0'+sec:sec;
            let min = d.getMinutes();
            min = min<10?'0'+min:min;
            return `${d.getHours()}:${min}:${sec}`;
        }
    },
    computed: {
        period: () => {
            let hour = (new Date).getHours();
            return (hour > 5 && hour < 18) ? 'app--day' : 'app--night';
        },
        positionEnabled() {
            return this.$store.state.positionEnabled;
        },


    }
};