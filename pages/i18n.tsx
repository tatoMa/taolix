import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import Link from "next/link";
// import LocaleSwitcher from 'components/LocaleSwitcher';
// import PageLayout from 'components/PageLayout';

export default function Index() {
  const t = useTranslations("Layout");
  return (
    // <PageLayout title={t('title')}>
    <>
      <br />
      <br />
      <br />
      <br />
      <br />
      <Link href="/i18n" locale="zh">
        To /中文/i18n
      </Link>
      <br />
      <Link href="/i18n" locale="en">
        To /eng/i18n
      </Link>
      <p>{t(`nav.home`)}</p>
      <p>{t(`nav.my-list`)}</p>
    </>
    //   <LocaleSwitcher />
    // </PageLayout>
  );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../i18n/${locale}.json`)).default,
    },
  };
}
