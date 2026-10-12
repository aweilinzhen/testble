from pathlib import Path
from playwright.sync_api import sync_playwright
folder=Path(__file__).parent
uri=(folder/'index.html').as_uri()
with sync_playwright() as p:
 browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 for width,height in [(320,720),(375,812),(390,844),(425,880)]:
  page=browser.new_page(viewport={'width':width,'height':height},device_scale_factor=1,is_mobile=True,has_touch=True,accept_downloads=True)
  errors=[]
  page.on('pageerror',lambda err:errors.append(str(err)))
  page.set_content('<html><head><meta name="viewport" content="width=device-width,initial-scale=1"></head><body><div id="app"></div></body></html>')
  page.add_style_tag(content=(folder/'styles.css').read_text())
  page.add_script_tag(content=(folder/'app.js').read_text())
  assert page.locator('[data-page="advanced"]').count()==1
  page.locator('[data-page="device"]').click()
  assert page.locator('.debug-sheet').is_visible()
  page.locator('[data-action="device-popover"]').click()
  assert page.locator('.device-popover').is_visible()
  page.locator('[data-action="device-popover-close"]').evaluate('e=>e.click()')
  page.screenshot(path=str(folder/f'preview-device-{width}.png'))
  page.locator('[data-tab="record"]').click()
  page.locator('[data-action="record-meeting"]').click()
  page.locator('[data-action="mark-on"]').click()
  assert page.locator('.mini-item').count()>=2
  page.locator('[data-action="sync-on"]').click()
  assert page.locator('[data-action="sync-on"]').get_attribute('aria-pressed')=='true'
  page.screenshot(path=str(folder/f'preview-record-{width}.png'))
  page.locator('[data-action="record-stop"]').click()
  page.locator('[data-tab="wifi"]').click()
  assert page.locator('[data-action="wifi-test"]').count()==1
  page.locator('[data-action="wifi-test"]').click()
  assert page.get_by_text('连接检测通过（模拟）').count()>0
  page.locator('[data-tab="files"]').click()
  assert page.locator('.file-row').count()==4
  page.locator('[data-action="download-file"]').first.click()
  assert page.locator('.transfer-card').is_visible()
  page.wait_for_timeout(550)
  page.locator('[data-action="transfer-cancel"]').click()
  assert page.locator('[data-action="transfer-resume"]').is_visible()
  page.locator('[data-action="transfer-resume"]').click()
  page.wait_for_timeout(3000)
  assert page.locator('[data-action="local-file"]').count()>=1
  page.screenshot(path=str(folder/f'preview-files-{width}.png'))
  # OTA resume flow
  page.locator('[data-tab="ota"]').click()
  page.locator('[data-action="ota-open"]').click()
  page.locator('[data-source="online"]').click()
  page.locator('#firmware-url').fill('https://example.com/firmware-0.2.1.bin')
  page.locator('[data-action="ota-download"]').click()
  page.wait_for_timeout(1820)
  page.locator('[data-action="ota-upgrade"]').click()
  page.wait_for_timeout(550)
  page.locator('[data-action="ota-cancel"]').click()
  page.locator('[data-action="modal-confirm"]').click()
  assert page.locator('[data-action="ota-resume"]').count()==1
  page.screenshot(path=str(folder/f'preview-ota-resume-{width}.png'))
  page.locator('[data-action="ota-resume"]').click()
  page.wait_for_timeout(3900)
  assert page.get_by_text('升级已完成').count()>0
  # Advanced
  page.locator('[data-action="back"]').click()
  page.locator('[data-page="advanced"]').click()
  assert page.get_by_text('U 盘模式',exact=True).count()>0
  page.locator('[data-action="usb-on"]').click()
  assert page.locator('[data-action="usb-on"]').get_attribute('aria-pressed')=='true'
  page.locator('[data-action="g2-query"]').click()
  assert page.locator('.mini-item').count()>=3
  page.locator('[data-action="frame-start"]').click()
  assert page.locator('[data-action="frame-cancel"]').get_attribute('aria-disabled')!='true'
  page.locator('[data-action="frame-cancel"]').click()
  page.locator('[data-action="paste-01"]').click()
  assert page.get_by_text('0x01 指令已执行（模拟）').count()>0
  page.screenshot(path=str(folder/f'preview-advanced-{width}.png'))
  page.locator('[data-action="factory-reset"]').click()
  assert page.locator('.modal-box').is_visible()
  page.locator('[data-action="modal-confirm"]').click()
  assert page.locator('[data-action="usb-on"]').get_attribute('aria-pressed')=='false'
  before=page.locator('.debug-sheet').evaluate('e=>e.getBoundingClientRect().height')
  box=page.locator('.debug-drag-zone').bounding_box()
  page.mouse.move(box['x']+box['width']/2,box['y']+6)
  page.mouse.down()
  page.mouse.move(box['x']+box['width']/2,box['y']-80,steps=5)
  page.mouse.up()
  after=page.locator('.debug-sheet').evaluate('e=>e.getBoundingClientRect().height')
  assert after > before+30,(before,after)
  assert page.locator('.toast').count()==0
  assert page.locator('body').evaluate('e=>document.documentElement.scrollWidth<=innerWidth')
  assert not errors,(width,errors)
  print('PASS',width,'device/record/sync/wifi/files/transfer/ota/resume/advanced/log',flush=True)
  page.close()
 browser.close()
