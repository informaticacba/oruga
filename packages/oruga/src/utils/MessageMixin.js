import Icon from '../components/icon/Icon'

export default {
    components: {
        [Icon.name]: Icon
    },
    // deprecated, to replace with default 'value' in the next breaking change
    model: {
        prop: 'active',
        event: 'update:active'
    },
    props: {
        active: {
            type: Boolean,
            default: true
        },
        closable: {
            type: Boolean,
            default: false
        },
        message: String,
        type: String,
        hasIcon: Boolean,
        size: String,
        icon: String,
        iconPack: String,
        iconSize: String,
        autoClose: {
            type: Boolean,
            default: false
        },
        duration: {
            type: Number,
            default: 2000
        }
    },
    data() {
        return {
            isActive: this.active
        }
    },
    watch: {
        active(value) {
            this.isActive = value
        },
        isActive(value) {
            if (value) {
                this.setAutoClose()
            } else {
                if (this.timer) {
                    clearTimeout(this.timer)
                }
            }
        }
    },
    computed: {
        /**
         * Icon name (MDI) based on type.
         */
        computedIcon() {
            if (this.icon) {
                return this.icon
            }
            switch (this.type) {
                case 'info':
                    return 'information'
                case 'success':
                    return 'check-circle'
                case 'warning':
                    return 'alert'
                case 'danger':
                    return 'alert-circle'
                default:
                    return null
            }
        }
    },
    methods: {
        /**
         * Close the Message and emit events.
         */
        close() {
            this.isActive = false
            this.$emit('close')
            this.$emit('update:active', false)
        },
        /**
         * Set timer to auto close message
         */
        setAutoClose() {
            if (this.autoClose) {
                this.timer = setTimeout(() => {
                    if (this.isActive) {
                        this.close()
                    }
                }, this.duration)
            }
        }
    },
    mounted() {
        this.setAutoClose()
    }
}
