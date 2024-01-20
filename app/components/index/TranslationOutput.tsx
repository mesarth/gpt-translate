import { CardContent } from '~/components/ui/card';
import { Skeleton } from '~/components/ui/skeleton';
import { Translation } from '~/service/storage.service';
import TranslationTextRow from '../TranslationTextRow';
import TranslationCardActions from '../TranslatioonCardActions';

export default function TranslationOutput({
  translation,
  loading,
}: {
  translation: Translation;
  loading: boolean;
}) {
  return (
    <CardContent className='p-5 flex gap-3'>
      <Skeleton key={`skeleton-text-${loading}`} show={loading} radius={4}>
        <TranslationTextRow
          language={translation.outputLanguage}
          text={translation.output}
          primary
          maximized={true}
        />
      </Skeleton>
      <TranslationCardActions
        translation={translation}
        maximized
        showMaximize={false}
      />
    </CardContent>
  );
}
