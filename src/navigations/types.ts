import type { NavigatorScreenParams } from '@react-navigation/native';

export type PracticesStackParamList = {
  PracticesList: undefined;
  PracticeDetail: { id: string; title: string };
};

export type RootTabParamList = {
  PracticesTab: NavigatorScreenParams<PracticesStackParamList> | undefined;
  SummaryTab: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootTabParamList {}
  }
}
