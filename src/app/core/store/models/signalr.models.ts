export interface ActionListenerData {
  actionId: number;
  actionName: string;
  entityName: string;
  entityIds: number[];
  modifierId: number;
}

export interface ActionProcessedNotification extends ActionListenerData {
  message: string;
}


