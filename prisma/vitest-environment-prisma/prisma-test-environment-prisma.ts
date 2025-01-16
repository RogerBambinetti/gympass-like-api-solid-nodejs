import { Environment } from 'vitest/environments';

export default <Environment>{
    name: 'prisma',
    transformMode: 'web',
    async setup(global, options) {

        console.log('Setup');

        return {
            teardown() {
                console.log("Teardown")
            }
        }
    }
}