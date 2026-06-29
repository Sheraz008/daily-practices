import { memo, useCallback } from 'react';
import { Pressable, ScrollView, Text } from 'react-native';
import { styles } from './styles';

export interface SegmentedTab<T extends string> {
  key: T;
  label: string;
}

interface SegmentedTabsProps<T extends string> {
  tabs: ReadonlyArray<SegmentedTab<T>>;
  activeKey: T;
  onChange: (key: T) => void;
  testID?: string;
}

function SegmentedTabsComponent<T extends string>({
  tabs,
  activeKey,
  onChange,
  testID,
}: SegmentedTabsProps<T>) {
  const renderTab = useCallback(
    (tab: SegmentedTab<T>) => {
      const active = tab.key === activeKey;
      return (
        <Pressable
          key={tab.key}
          onPress={() => onChange(tab.key)}
          accessibilityRole="tab"
          accessibilityState={{ selected: active }}
          testID={`${testID ?? 'segmented-tab'}-${tab.key}`}
          style={[styles.tab, active && styles.tabActive]}
        >
          <Text style={[styles.label, active && styles.labelActive]}>{tab.label}</Text>
        </Pressable>
      );
    },
    [activeKey, onChange, testID],
  );

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.bar}
      contentContainerStyle={styles.content}
    >
      {tabs.map(renderTab)}
    </ScrollView>
  );
}

export const SegmentedTabs = memo(SegmentedTabsComponent) as typeof SegmentedTabsComponent;
