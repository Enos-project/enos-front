
import { ApplicationType } from './ApplicationType';
import { FileType } from './FileType';
import { ParamType } from './ParamType';

export interface InstallationType {
    id: number;
    application: ApplicationType;
    installedVersion: string;
    installationDate: string;
    appFiles: FileType[];
    params: ParamType[];
}