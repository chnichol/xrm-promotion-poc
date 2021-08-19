import ServiceBuilder, { ServiceCollection } from 'services/serviceBuilder';
import ILMERGE_PATH from './ILMERGE_PATH';
import NET_SDK_TOOLS_PATH from './NET_SDK_TOOLS_PATH';

export {
    ILMERGE_PATH,
    NET_SDK_TOOLS_PATH
}

const addConstants = <C extends ServiceCollection>(builder: ServiceBuilder<C>) => builder
    .addSingleton<ILMERGE_PATH>(ILMERGE_PATH)
    .addSingleton<NET_SDK_TOOLS_PATH>(NET_SDK_TOOLS_PATH);
export default addConstants;