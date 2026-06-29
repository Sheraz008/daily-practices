import { FlashList } from '@shopify/flash-list';
import { memo, useCallback } from 'react';
import { ActivityIndicator, RefreshControl, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PracticeCard } from '@components/PracticeCard';
import { SegmentedTabs } from '@components/SegmentedTabs';
import { EmptyState, ErrorState, LoadingState } from '@components/StateViews';
import { colors } from '@theme/colors';
import type { Practice } from '@sharedTypes/practice';
import { CATEGORY_TABS, usePracticesList } from './usePracticesList';
import { styles } from './styles';

const PracticesList = () => {
  const {
    practices,
    columns,
    category,
    isLoading,
    isError,
    isRefreshing,
    isLoadingMore,
    error,
    onChangeCategory,
    onRefresh,
    onRetry,
    onEndReached,
    onPressPractice,
  } = usePracticesList();

  const renderItem = useCallback(
    ({ item }: { item: Practice }) => (
      <View style={styles.cell}>
        <PracticeCard practice={item} onPress={onPressPractice} />
      </View>
    ),
    [onPressPractice],
  );

  const renderFooter = useCallback(
    () =>
      isLoadingMore ? (
        <View style={styles.footer}>
          <ActivityIndicator color={colors.PRIMARY} />
        </View>
      ) : null,
    [isLoadingMore],
  );

  return (
    <SafeAreaView style={styles.fill} edges={['bottom']}>
      <SegmentedTabs
        tabs={CATEGORY_TABS}
        activeKey={category}
        onChange={onChangeCategory}
        testID="category-tabs"
      />

      {isLoading ? (
        <LoadingState />
      ) : isError ? (
        <ErrorState message={error ?? undefined} onRetry={onRetry} />
      ) : (
        <FlashList
          key={`cols-${columns}`}
          data={practices}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={columns}
          contentContainerStyle={styles.listContent}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.5}
          ListEmptyComponent={<EmptyState message="No practices match this filter." />}
          ListFooterComponent={renderFooter}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
              tintColor={colors.PRIMARY}
              colors={[colors.PRIMARY]}
            />
          }
        />
      )}
    </SafeAreaView>
  );
};

export default memo(PracticesList);
