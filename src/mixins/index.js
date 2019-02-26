const globalMixin = {
    computed: {
        period: () => {
            let hour = (new Date).getHours();
            return (hour > 5 && hour < 18) ? 'app--day' : 'app--night';
        }
    }
};

export default globalMixin;