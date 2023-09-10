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

export interface CheckProps {
  id: string;
  type: string;
  explanation: string;
  result: string[];
}
export interface CorrectionsListProps extends Array<CorrectionProps> {}

export interface ChecksListProps extends Array<CheckProps> {}

export interface ChecksProps {
  checksList: ChecksListProps;
  checkedText: string;
}

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
    burp0_data: {
      is_free: string; //boolen;
      plagchecker_locale: string;
      product_paper_type: string;
      title: string;
      text: string;
    },
    headers: AxiosHeaders["Content-Type, Authorization"]
  );
}

export interface Burp0Headers {
  "User-Agent": string;
  Accept: string;
  "Accept-Language": string;
  "Accept-Encoding": string;
  Referer: string;
  "Content-Type": string;
  "X-Requested-With": string;
  Origin: string;
  Dnt: string;
  "Sec-Fetch-Dest": string;
  "Sec-Fetch-Mode": string;
  "Sec-Fetch-Site": string;
  Pragma: string;
  "Cache-Control": string;
  Te: string;
  Connection: string;
}

export const burp0_headers: Burp0Headers = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 6.3; Win64; x64; rv:100.0) Gecko/20100101 Firefox/100.0",
  Accept: "*/*",
  "Accept-Language": "ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3",
  "Accept-Encoding": "gzip, deflate",
  Referer: "https://papersowl.com/free-plagiarism-checker",
  "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
  "X-Requested-With": "XMLHttpRequest",
  Origin: "https://papersowl.com",
  Dnt: "1",
  "Sec-Fetch-Dest": "empty",
  "Sec-Fetch-Mode": "no-cors",
  "Sec-Fetch-Site": "same-origin",
  Pragma: "no-cache",
  "Cache-Control": "no-cache",
  Te: "trailers",
  Connection: "close",
};

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
//plagiat section
export type AddCheckProps = (newListCkeck: ChecksProps) => void;

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
  setFile: Dispatch<SetStateAction<File | null>>;
  setRes: Dispatch<SetStateAction<any>>;
}

interface FileItemProps {
  file: File | null;
}
interface TextCheckPropos {
  textToCheck: string;
}

interface ResProps {
  setRes: Dispatch<SetStateAction<string>>;
}

interface RessProps {
  res: string;
}
