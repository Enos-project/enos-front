
import { FileType } from './FileType';

export interface ApplicationType {
    id: number;
    name: string;
    description: string;
    currentVersion: string;
    defaultApplication: boolean;
    publisher: string;
    icon: FileType;
    type: string;
    applicationStaticFiles: FileType[];
}
