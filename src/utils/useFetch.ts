import { ref, isRef, unref, watchEffect, type Ref } from "vue";

export function useFetch<T>(url: string | Ref<string>) {
  const response = ref(null) as Ref<T | null>;
  const error = ref(null);

  async function doFetch() {
    response.value = null;
    error.value = null;
    const urlValue = unref(url);

    try {
      const res = await fetch(urlValue);
      response.value = await res.json();
    } catch (e: any) {
      error.value = e;
    }
  }

  if (isRef(url)) {
    watchEffect(doFetch);
  } else {
    doFetch();
  }

  return { response, error, retry: doFetch };
}
