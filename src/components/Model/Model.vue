<script>
    import axios from 'axios';

    export default {
        name: 'hello',
        data: function () {
            return {
                msg: 'Welcome to you sdf'
            }
        },
        methods: {
            addToApi () {
                let msg = this.msg;
            }
        }
    }
</script>
