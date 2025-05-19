<script>
    ;(function(){
  const footer = document.getElementById('site-footer');

    function checkScroll() {
    // how close to the bottom? 20px tolerance
    const threshold = 20;
    const scrolled = window.scrollY + window.innerHeight;
    const atBottom = (document.documentElement.scrollHeight - scrolled) < threshold;

    footer.classList.toggle('visible', atBottom);
  }

    // run on scroll and on load (in case the page is already short)
    window.addEventListener('scroll', checkScroll, {passive: true });
    window.addEventListener('resize', checkScroll);
    document.addEventListener('DOMContentLoaded', checkScroll);
})();
</script>
