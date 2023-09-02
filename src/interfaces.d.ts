import { AxiosHeaders } from "axios";
import { HeaderDescription, HeaderTitle, ResponseProperties } from "./enums";

export interface ChatGPTMessageProps {
  role: string;
  content: string;
}

export interface CorrectionProps {
  id: string;
  type: string;
  explanation: string;
  result: string[];
}

export interface CorrectionsListProps extends Array<CorrectionProps> {}

export interface CorrectionsProps {
  correctionsList: CorrectionsListProps;
  correctedText: string;
}

export interface MakeRequestProps {
  (
    url: string,
    payload: ChatGPTJSON_dataProps,
    headers: AxiosHeaders["Content-Type, Authorization"]
  ): Promise<any>;
}

export interface MakeRequestPropsTrunitin {
  (
    url: string,
    burp0_data: Turnitin_dataProps,
    headers: AxiosHeaders["Content-Type, Authorization"]
  );
}
export interface ChatGPTJSON_dataProps {
  model: string;
  messages: ChatGPTMessageProps[];
  temperature: number;
}

export interface NavbarLinkProps {
  name: string;
  href: string;
  icon: string;
  backgroundColor: string;
}

export interface BannerProps {
  title: HeaderTitle;
  description: HeaderDescription;
  className?: string;
}

export interface ChildrenProps {
  children: React.ReactNode;
}

export type AddCorrectionProps = (newCorrections: CorrectionsProps) => void;

export type SetSummaryProps = (newSummary: string) => void;

export interface UseChatGPTProps {
  initialPrompt: ChatGPTMessageProps;
  customProperty: ResponseProperties;
  customSetState: AddCorrectionProps | SetSummaryProps;
}

export type FromText = string;

export interface ModalContentProps {
  content: {
    "How It Works": string[];
    Limitations: string[];
    "Common Mistakes"?: string[];
    "Common Features"?: string[];
    Tips: string[];
    Disclaimers: string[];
  };
}

interface UploadedFile extends File {
  isUploading: boolean;
}

interface FileUploadProps {
  setRes: Dispatch<SetStateAction<any>>;
}

interface FileItemProps {
  file: File | null;
}

interface Section {
  title: string;
  // Other properties
}

interface FileResProps {
  res: string;
  setRes: Dispatch<SetStateAction<any>>;
}

interface ResProps {
  res: string;
  setRes: Dispatch<SetStateAction<string>>;
}
