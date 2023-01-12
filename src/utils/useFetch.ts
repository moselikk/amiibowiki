import { ref, isRef, unref, watchEffect, type Ref } from "vue";

export function useFetch<T>(url: string | Ref<string>) {
  const response = ref(null) as Ref<T | null>;
  const error = ref(null);

  async function doFetch() {
    // reset state before fetching..
    response.value = null;
    error.value = null;

    // resolve the url value synchronously so it's tracked as a
    // dependency by watchEffect()
    const urlValue = unref(url);

    try {
      // unref() will return the ref value if it's a ref
      // otherwise the value will be returned as-is
      const res = await fetch(urlValue);
      response.value = await res.json();
    } catch (e: any) {
      error.value = e;
    }
  }

  if (isRef(url)) {
    // setup reactive re-fetch if input URL is a ref
    watchEffect(doFetch);
  } else {
    // otherwise, just fetch once
    doFetch();
  }

  return { response, error, retry: doFetch };
}
