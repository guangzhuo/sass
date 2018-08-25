<template>
    <div class="row lx-privacy-agreement">
        <div class="about-bg-h">
            <div class="lx-container">
                <div class="row public-margin-h" id="privacy-h">首页 > <span v-text="navText"></span></div>
                <div class="row content">
                    <div class="row footer-mar-bottom-h">
                        <ul id="myTab" class="nav nav-tabs-privacy-h text-center col-xs-4 col-xs-offset-4">
                            <li class="col-xs-6" @click="onSwitchTab('1')">
                                <a v-bind:class="{ active: type === '1'}" class="font-weight-h" id="protocol" data-toggle="tab">注册协议</a>
                            </li>
                            <li class="col-xs-6" @click="onSwitchTab('2')">
                                <a v-bind:class="{ active: type === '2'}"  class="font-weight-h" id="statement" data-toggle="tab">隐私声明</a>
                            </li>
                        </ul>
                    </div>
                    <div id="myTabContent" class="row tab-content">
                        <div v-bind:class="{ active: type === '1'}" class="tab-pane fade in" id="agreement">
                            <div class="row">
                                <p class="font-weight-h privacy-p-h about-p-h">【首部及导言】</p>
                            </div>
                            <div class="row">
                                <p class="index-privacy-agreement-p about-p-h">“云合同”是由浙江律讯网络科技有限公司独立开发、独立运营的具备在线合同生成、在线合同签署、在线合同保管等功能的第三方电子商务平台。“云合同”服务范围包括免费部分及收费部分，为有效利用“云合同”平台资源，维护注册用户合法权益，特制订《“云合同”注册协议》（以下简称“本协议”）。请你注册时务必审慎阅读、充分理解本协议各条款内容，特别是免除或者限制责任的条款，以及开通或使用某项服务的单独协议，并选择接受或不接受。限制、免责条款会以彩色字体提示你仔细阅读。如你对本协议条款有任何疑问的，可向“云合同”客服咨询。</p>
                            </div>
                            <div class="row">
                                <p class="index-privacy-agreement-p1 about-p-h">当你按照注册页面提示填写信息、阅读并同意本协议且完成全部注册程序后，即表示你已充分阅读、理解并接受本协议的全部内容，并与“云合同”平台达成协议。你承诺接受并遵守本协议的约定， 届时你不应以未阅读本协议的内容或者未获得“云合同”平台对你问询的解答等理由，主张本协议无效，或要求撤销。</p>
                            </div>
                            <div class="row">
                                <p class="font-weight-h privacy-p-h">一、【协议的范围】</p>
                            </div>
                            <div class="row">
                                <p class="index-privacy-agreement-p about-p-h">本协议适用于“云合同”提供的“云合同”注册服务及需要使用“云合同”账号的全部免费、付费服务及其他服务，是“云合同”全部业务规则的基础和不可分割的组成部分。当你需要使用“云合同”平台其他需要另行签署单独协议的功能时，你仅需签署单独协议即可，你签署单独协议的行为将视为你对本协议的认同。</p>
                            </div>
                            <div class="row">
                                <p class="font-weight-h privacy-p-h">二、【注册与账户】</p>
                            </div>
                            <div class="row">
                                <p class="index-privacy-agreement-p about-p-h">1、主体资格</p>
                            </div>
                            <div class="row">
                                <p class="index-privacy-agreement-p about-p-h">申请注册“云合同”的用户须为能够独立承担法律责任的自然人、法人及其他组织。凡接受我们条款进行注册及使用我们服务的用户须严格遵守本协议的约定及所使用服务需另行签署的协议约定。</p>
                            </div>
                            <div class="row">
                                <p class="index-privacy-agreement-p about-p-h">2、用户注册</p>
                            </div>
                            <div class="row">
                                <p class="index-privacy-agreement-p about-p-h">你在注册“云合同”时，需要提供你的有效电子邮箱，并提供你的手机号码用来接收验证码。当你按照注册页面提示填写注册邮箱、阅读并同意本协议且完成注册程序所需的手机验证后，你即可使用你提供或确认的邮箱作为登录手段进入“云合同”平台获取服务。</p>
                            </div>
                            <div class="row">
                                <p class="index-privacy-agreement-p1 about-p-h">需要注意的是：你需要维护并及时更新个人信息以保持信息的即时、完整，如果因为你提供的注册信息错误导致不能注册，“云合同”将无法为你提供需有效注册才能提供的服务。“云合同”并不承担对用户注册信息的真实性进行核实的义务，也不能保证用户提交注册信息的真实性、准确性和合法性，同时也不承担由此产生的任何法律责任。</p>
                            </div>
                            <div class="row">
                                <p class="index-privacy-agreement-p about-p-h">3、账户安全</p>
                            </div>
                            <div class="row">
                                <p class="index-privacy-agreement-p about-p-h">你须自行负责对你的“云合同”登录名、昵称和密码等账户信息保密，且须对你的“云合同”账户下发生的所有活动（包括但不限于信息披露、发布信息、网上点击同意或提交各类规则协议、网上续签协议或购买服务等）承担责任。</p>
                            </div>
                            <div class="row">
                                <p class="index-privacy-agreement-p1 about-p-h">你同意：(a) 如发现任何人未经授权使用你的“云合同”账户，你应立即通知“云合同”，并授权“云合同”根据“云合同”技术安全要求进行处理；及 (b) 确保你在每个上网时段结束时，以正确步骤离开网站/服务。“云合同”不能也不会对因你未能遵守本款规定而发生的任何损失负责。你理解“云合同”对你的请求采取行动需要合理时间，“云合同”对在采取行动前已经产生的后果（包括但不限于你的任何损失）不承担任何责任。</p>
                            </div>
                            <div class="row">
                                <p class="index-privacy-agreement-p about-p-h">4、账户注销</p>
                            </div>
                            <div class="row">
                                <p class="index-privacy-agreement-p about-p-h">因注册邮箱不能更换，如果你不再使用注册时候使用的邮箱，你直接用你常用的邮箱重新申请注册新账户即可。</p>
                            </div>
                            <div class="row">
                                <p class="font-weight-h privacy-p-h">三、【资费收取】</p>
                            </div>
                            <div class="row">
                                <p class="index-privacy-agreement-p about-p-h">1、你注册成为“云合同”用户是免费的，我们会为你提供合同模板及在线上传合同等免费服务。</p>
                            </div>
                            <div class="row">
                                <p class="index-privacy-agreement-p about-p-h">2、如果你选择使用“云合同”的收费服务，具体费用标准我们会在你申请使用该服务时候给你提示，在“云合同”关于我们中也会有我们各项收费服务的具体费用标准。“云合同”保留修改费用条款的权利，一旦费用条款被修改，将及时在“云合同”上公布，若你是付费用户，我们会通过你的邮箱或其他方式通知你新的费用标准，修改后的费用标准不影响你原来的付费服务。</p>
                            </div>
                            <div class="row">
                                <p class="index-privacy-agreement-p1 about-p-h">请注意：“云合同”不承担你选择“云合同”的收费服务可能还需要自行支付的计算机软硬件、税收、通讯、网络服务费及其它费用。</p>
                            </div>
                            <div class="row">
                                <p class="font-weight-h privacy-p-h">四、【信息收集】</p>
                            </div>
                            <div class="row">
                                <p class="index-privacy-agreement-p about-p-h">为了保护你的使用安全，当你在“云合同”注册成为用户时，“云合同”会自动收集你的注册电子邮箱、手机号等信息。当你浏览“云合同”时，服务器会自动收集你的IP地址及浏览页面等信息。除非用户许可或法律需要，“云合同”不会泄露收集到的你的任何信息。具体信息收集及使用规则，请参看“云合同”《隐私声明》。</p>
                            </div>
                            <div class="row">
                                <p class="font-weight-h privacy-p-h">五、【用户行为规范】</p>
                            </div>
                            <div class="row">
                                <p class="index-privacy-agreement-p about-p-h">1、你在使用“云合同”时，须保证遵守国家的法律法规，遵守“云合同”包括但不限于本协议及其他版块的相关协议、规定、规则、程序和惯例，不得利用“云合同”从事任何非法活动。你同意不做以下行为：</p>
                            </div>
                            <div class="row">
                                <p class="index-privacy-agreement-p about-p-h">a.有关宗教、种族或性别等的贬损言辞，或含淫秽、色情、侮辱、诽谤、欺诈等内容的信息；</p>
                            </div>
                            <div class="row">
                                <p class="index-privacy-agreement-p about-p-h">b.侵犯任何第三方著作权、专利、商标、商业秘密、隐私权、名誉权或其它权利的信息； </p>
                            </div>
                            <div class="row">
                                <p class="index-privacy-agreement-p about-p-h">c.不会含有蓄意毁坏、恶意干扰、秘密地截取或侵占任何系统、数据或个人资料的任何病毒、伪装破坏程序、电脑蠕虫、定时程序炸弹或其他电脑程序；</p>
                            </div>
                            <div class="row">
                                <p class="index-privacy-agreement-p about-p-h">d.其它任何违反国家法律法规等行为。</p>
                            </div>
                            <div class="row">
                                <p class="index-privacy-agreement-p about-p-h">2、你对通过“云合同”发布的所有信息（内容包括但不限于个人信息、商业信息，形式包括但不限于文字、图片、视频）的真实性、准确性、即时性、完整性和合法性独立承担所有责任。</p>
                            </div>
                            <div class="row">
                                <p class="index-privacy-agreement-p about-p-h">3、“云合同”会结合你的账号申请进程，通过电子邮件或“云合同”平台消息推送两种方式向你发送相关信息，“云合同”向你的电子邮箱地址发送的电子邮件在进入你的电子邮箱接收系统时，视为送达。</p>
                            </div>
                            <div class="row">
                                <p class="font-weight-h privacy-p-h">六、【权利、义务及责任】</p>
                            </div>
                            <div class="row">
                                <p class="index-privacy-agreement-p about-p-h">1、你同意：</p>
                            </div>
                            <div class="row">
                                <p class="index-privacy-agreement-p about-p-h">a.在“云合同”未向你收费的情况下，“云合同”可自行全权决定以任何理由 (包括但不限于你已违反本协议的字面意义和精神，或你以不符合本协议的字面意义和精神的方式行事，或你在超过规定时间内未用你的账号及密码登录网站) 终止你的“服务”密码、账户 (或其任何部份) 或你对“服务”的使用，并删除和丢弃你在使用“服务”中提交的 “你的资料”；</p>
                            </div>
                            <div class="row">
                                <p class="index-privacy-agreement-p about-p-h">b.在“云合同”向你收费的情况下，“云合同”应基于合理的怀疑且经电子邮件通知的情况下实施上述终止服务的行为。“云合同”同时可自行全权决定，在发出通知或不发出通知的情况下，随时停止提供“服务”或其任何部分；</p>
                            </div>
                            <div class="row">
                                <p class="index-privacy-agreement-p about-p-h">c.“云合同”根据本协议的任何规定终止你使用“服务”之措施可在不发出事先通知的情况下实施，“云合同”认为必要时可立即使你的账户无效，或撤销你的账户以及在你的账户内的所有相关资料和档案，或禁止你进一步接入该等档案或“服务”。账号终止后，“云合同”没有义务为你保留原账号中或与之相关的任何信息，或转发任何未曾阅读或发送的信息给你或第三方；</p>
                            </div>
                            <div class="row">
                                <p class="index-privacy-agreement-p about-p-h">d.“云合同”不会就终止你接入“服务”而对你或任何第三者承担任何责任。</p>
                            </div>
                            <div class="row">
                                <p class="index-privacy-agreement-p about-p-h">2、“云合同”会尽一切努力使你在使用“云合同”的过程中得到最好的用户体验。但是，“云合同”不能随时预见到任何技术上的问题或其他困难。该等困难可能会导致数据损失或其他服务中断。为此，你明确理解和同意，你使用“服务”的风险由你自行承担。“云合同”明确声明不作出任何种类的所有明示或暗示的保证，包括但不限于关于适销性、适用于某一特定用途和无侵权行为等方面的保证。“云合同”不作保证的内容包括：</p>
                            </div>
                            <div class="row">
                                <p class="index-privacy-agreement-p about-p-h">a.“服务”会符合你的要求；</p>
                            </div>
                            <div class="row">
                                <p class="index-privacy-agreement-p about-p-h">b.“服务”不会中断，且适时、安全和不带任何错误；</p>
                            </div>
                            <div class="row">
                                <p class="index-privacy-agreement-p about-p-h">c.通过使用“服务”而可能获取的结果将是准确或可信赖的；</p>
                            </div>
                            <div class="row">
                                <p class="index-privacy-agreement-p about-p-h">d.你通过“服务”而购买或获取的任何产品、服务、资料或其他材料的质量将符合你的预期。通过使用“服务”而下载或以其他形式获取任何材料是由你自行全权决定进行的，且与此有关的风险由你自行承担，对于因你下载任何该等材料而发生的你的电脑系统的任何损毁或任何数据损失，你将自行承担责任。你使用从“云合同”获取的任何口头或书面意见及资料，均由你承担相应的法律责任。</p>
                            </div>
                            <div class="row">
                                <p class="index-privacy-agreement-p about-p-h">3、你明确理解和同意，“云合同”不对因下述任一情况而发生的任何损害赔偿承担责任，包括但不限于利润、商誉、使用、数据等方面的损失或其他无形损失的损害赔偿 (无论“云合同”是否已被告知该等损害赔偿的可能性)：</p>
                            </div>
                            <div class="row">
                                <p class="index-privacy-agreement-p about-p-h">a.使用或未能使用“服务”；</p>
                            </div>
                            <div class="row">
                                <p class="index-privacy-agreement-p about-p-h">b.因通过或从“服务”购买或获取任何货物、样品、数据、资料或服务，及通过或从“服务”接收任何信息或缔结任何交易所产生的获取替代货物和服务的费用；</p>
                            </div>
                            <div class="row">
                                <p class="index-privacy-agreement-p about-p-h">c.任何第三者对“服务”的声明或关于“服务”的行为； </p>
                            </div>
                            <div class="row">
                                <p class="index-privacy-agreement-p about-p-h">d.因任何原因而引起的与“服务”有关的任何其他事宜，包括疏忽。</p>
                            </div>
                            <div class="row">
                                <p class="font-weight-h privacy-p-h">七、【纠纷的处理】</p>
                            </div>
                            <div class="row">
                                <p class="index-privacy-agreement-p about-p-h">1、用户同意在使用“云合同”的过程中，当发现任何可能侵害自己或“云合同”权利的事实时，应及时通知“云合同”并提供相应的证明材料。因投诉不实给“云合同”或第三方造成损失的，用户应承担法律责任。</p>
                            </div>
                            <div class="row">
                                <p class="index-privacy-agreement-p about-p-h">2、“云合同”有权接受并处理你与其他用户间因使用“云合同”而产生的纠纷、争议及投诉，有权通过电子邮件等联系方式向你了解情况、并将所了解的情况通过电子邮件等方式通知对方。你有义务在收到“云合同”通知后、在指定的时间内提供相应的资料，配合纠纷、争议及投诉的处理，否则，由于你怠于行使权利导致的你的损失，“云合同”不承担任何责任。</p>
                            </div>
                            <div class="row">
                                <p class="index-privacy-agreement-p about-p-h">3、因“云合同”并非司法机关等国家权利机关，你完全理解并承认：“云合同”对证据的鉴别能力及对纠纷的处理能力有限，受理、处理纠纷、争议及投诉完全是基于你的授权，不保证处理结果符合你的期望，亦不对处理结果承担任何责任。“云合同”有权决定是否参与争议的处理。</p>
                            </div>
                            <div class="row">
                                <p class="index-privacy-agreement-p about-p-h">4、经生效法律文书确认用户存在违法或违反本协议行为或者“云合同”自行判断你涉嫌存在违法或违反本协议行为的，“云合同”有权公布用户的违法行为并做出相应处理，包括但不限于终止服务、永久禁止使用“云合同”等。</p>
                            </div>
                            <div class="row">
                                <p class="font-weight-h privacy-p-h">八、【链接】</p>
                            </div>
                            <div class="row">
                                <p class="index-privacy-agreement-p about-p-h">“云合同”的服务包括提供其他网站的链接，但“云合同”并不能控制这些网站及其所提供的资源，所以对链接网站上的内容、广告、服务、产品信息的真实、准确、即时、完整性不做任何承诺，并且对链接网站不承担任何法律责任。</p>
                            </div>
                            <div class="row">
                                <p class="font-weight-h privacy-p-h">九、【隐私政策】</p>
                            </div>
                            <div class="row">
                                <p class="index-privacy-agreement-p1 about-p-h">“云合同”的《隐私声明》刊登在www.yunhetong.com，你在同意本协议前应充分阅读、接受并同意《隐私声明》的全部规定，你同意本协议并使用“云合同”服务的行为将视为你接受“云合同”的《隐私声明》。</p>
                            </div>
                            <div class="row">
                                <p class="font-weight-h privacy-p-h">十、【知识产权】</p>
                            </div>
                            <div class="row">
                                <p class="index-privacy-agreement-p about-p-h">1、“云合同”上所有内容的选材、整理、编排、排版、汇编，以及由“云合同”创作的文字、图片等作品的著作权，无论是否明示，均属“云合同”所有。任何自然人、法人及其他组织未经“云合同”书面授权或许可，不得修改、出版、传播、参与传播、销售、制作衍生作品，或以其他任何方式使用整体或部分的“云合同”上的内容，包括但不限于公司信息、产品信息。否则，“云合同”将保留追究其法律责任的权利。</p>
                            </div>
                            <div class="row">
                                <p class="index-privacy-agreement-p about-p-h">2、“云合同”对其开发或者合作开发的系统等享有知识产权。“云合同”上所有可阅读的资料等都受到《中华人民共和国著作权法》、《中华人民共和国商标法》等的法律保护。“云合同”尊重和保护他人的知识产权，不允许在没有著作权、商标权或其他专有权权利人明确许可的情况下，发布或者传播任何可能侵犯他人权利的信息、图片，否则，行为人承担由此产生的全部责任。</p>
                            </div>
                            <div class="row">
                                <p class="font-weight-h privacy-p-h">十一、【法律适用及管辖】</p>
                            </div>
                            <div class="row">
                                <p class="index-privacy-agreement-p about-p-h">1、本协议的订立、变更、执行和解释，以及与本协议有关的争议解决，均应适用中华人民共和国相关法律。如与本协议有关的某一特定事项缺乏明确法律规定，则应参照通用的国际商业惯例和行业惯例。</p>
                            </div>
                            <div class="row">
                                <p class="index-privacy-agreement-p about-p-h">2、如因本协议或“云合同”服务所引起或与其有关的任何争议，首先应友好协商解决；协商不成的，你同意将纠纷或争议提交浙江律讯网络科技有限公司所在地人民法院管辖。</p>
                            </div>
                            <div class="row">
                                <p class="font-weight-h privacy-p-h">十二、【其他】</p>
                            </div>
                            <div class="row">
                                <p class="index-privacy-agreement-p about-p-h">1、你使用“云合同”相关服务时，亦应充分阅读、认可并同意遵守相关服务的额外条款及条件。</p>
                            </div>
                            <div class="row">
                                <p class="index-privacy-agreement-p about-p-h">2、如本协议中的任何条款无论因何种原因完全或部分无效或不具有执行力，本协议的其余条款仍应有效并且有约束力。</p>
                            </div>
                            <div class="row">
                                <p class="index-privacy-agreement-p about-p-h">3、本协议中的标题仅为方便而设，不具有任何单独的法律效力。</p>
                            </div>
                            <div class="row">
                                <p class="font-weight-h privacy-p-h">云合同合同模板使用声明</p>
                            </div>
                            <div class="row">
                                <p class="index-privacy-agreement-p about-p-h">“云合同”平台提供的合同模板均对云合同注册用户免费开放，“云合同”承诺不就合同模板的使用向用户收取任何费用。</p>
                            </div>
                            <div class="row">
                                <p class="index-privacy-agreement-p1 about-p-h">需要注意的是：“云合同”平台提供的合同模板系由“云合同”编辑人员搜集整理，用户获取的“云合同”平台提供的合同模板不代表“云合同”立场，“云合同”也不对用户因使用平台提供的合同模板所产生的纠纷负任何法律责任。</p>
                            </div>
                        </div>
                        <div v-bind:class="{ active: type === '2'}" class="tab-pane in" id="privacy">
                            <div class="row">
                                <p class="index-privacy-agreement-p about-p-h">欢迎访问“云合同”！我们以本隐私声明对访问者的隐私保护做出许诺。我们会在本隐私声明中公开“云合同”平台对用户进行的信息收集和使用情况。我们网站的隐私声明会随着我们服务范围和服务内容的调整随时更新，欢迎你随时回来查看我们的隐私声明，并提出你的宝贵意见。</p>
                            </div>
                            <div class="row">
                                <p class="index-privacy-agreement-p about-p-h">在你同意之时，你已经同意我们按照本隐私声明来使用和披露你的个人信息。本隐私声明的全部条款属于该协议的一部份。</p>
                            </div>
                            <div class="row">
                                <p class="font-weight-h privacy-p-h">未成年人的特别注意事项</p>
                            </div>
                            <div class="row">
                                <p class="index-privacy-agreement-p about-p-h">如果你未满18周岁，你无权独自使用本公司服务，特别是需要收费的服务。因此如果你未满18周岁，你只能在父母或监护人的陪同下才可以使用本公司服务。</p>
                            </div>
                            <div class="row">
                                <p class="font-weight-h privacy-p-h">用户名和密码</p>
                            </div>
                            <div class="row">
                                <p class="index-privacy-agreement-p about-p-h">当你注册成为会员后，我们会以你申请注册的邮箱作为你的用户名。在你丢失密码后我们将通过你注册使用的手机号和电子邮箱帮助你找回秘密。需要提醒你的是：你只能通过你的密码来使用你的账号。如果你泄漏了密码，你可能会丢失你的个人信息，并且可能出现对你不利的后果。因此，无论任何原因，不论任何时候，你发现有危及你的密码安全的行为时候，你应该立即修改密码，并及时和我们取得联系。</p>
                            </div>
                            <div class="row">
                                <p class="font-weight-h privacy-p-h">身份信息采集</p>
                            </div>
                            <div class="row">
                                <p class="index-privacy-agreement-p about-p-h">当你在注册为会员后，需要使用我们的收费业务时，我们会要求你填写你的身份信息，包括你的真实姓名，有效证件号码等。如果你是企业用户，你会被要求提供你的公司营业执照号码或组织机构代码，法定代表人姓名及有效证件号码，公司住所地，公司电话号码等信息。我们会通过采集身份信息来获得会员的统计资料。我们将会用这些统计数据来给我们的会员分类，例如年龄、产业和国家等，以便有针对性地向我们的会员提供新的服务和机会。我们会通过你的邮件地址来通知你这些新的服务和机会。</p>
                            </div>
                            <div class="row">
                                <p class="font-weight-h privacy-p-h">平台使用记录</p>
                            </div>
                            <div class="row">
                                <p class="index-privacy-agreement-p about-p-h">在你使用我们的服务时，我们的平台会自动接收并记录你的浏览器和计算机上的信息，其中包括你的 IP 地址，你生成的电子签章，软硬件特征信息、以及你需求的网页记录，cookie 中的信息等。（cookies是少量的数据，在你未拒绝接受cookies的情况下，cookies将被发送到你的浏览器，并储存在你的计算机硬盘。我们使用cookies储存你访问我们网站的相关数据，在你访问或再次访问我们的网站时,我们能识别你的身份，并通过分析数据为你提供更好更多的服务。 你有权选择接受或拒绝接受cookies。你可以通过修改浏览器的设置以拒绝接受cookies，但是我们需要提醒你，因为你拒绝接受cookies，你可能无法使用依赖于cookies的我们网站的部分功能）</p>
                            </div>
                            <div class="row">
                                <p class="font-weight-h privacy-p-h">银行账号</p>
                            </div>
                            <div class="row">
                                <p class="index-privacy-agreement-p about-p-h">你使用我们收费服务时可能需要提供你的银行账号，我们会合理获取及管理你的银行账户信息。</p>
                            </div>
                            <div class="row">
                                <p class="font-weight-h privacy-p-h">你的交易行为</p>
                            </div>
                            <div class="row">
                                <p class="index-privacy-agreement-p about-p-h">你在使用我们的服务时，按照国家相关法律法规、部门规章、政策的要求，出于身份和交易真实性的识别、安全考虑，我们会跟踪你的IP地址。如果我们没有发现任何安全问题也没有收到你就交易安全反馈的问题，我们会在六十天后删除我们收集到的IP地址。基于我们的未来发展制定计划（例如，增加服务器）需要，我们会全程跟踪用来反映网站的流量的页面访问数据以及你因交易行为而产生的其它数据，请你理解。</p>
                            </div>
                            <div class="row">
                                <p class="index-privacy-agreement-p about-p-h">你如果在“云合同”平台提供发布供贸易的物品信息或报价等，该信息或报价等将被显示在公共区域，对任何用户来说是公开的。请注意所有在这些场所公开的信息都会成为公共信息，请你在决定公布你的个人信息前仔细考虑。</p>
                            </div>
                            <div class="row">
                                <p class="font-weight-h privacy-p-h">本网站上的信息</p>
                            </div>
                            <div class="row">
                                <p class="index-privacy-agreement-p about-p-h">本网站上关于“云合同”会员或他们的产品（包括但不限于公司名称、联系人及联络信息，产品的描述和说明，相关图片、视讯等）的信息均由会员自行提供，会员依法应对其提供的任何信息承担全部责任。“云合同”对此等信息的准确性、完整性、合法性或真实性均不承担任何责任。此外，“云合同”对任何使用或提供本网站信息的商业活动及其风险不承担任何责任。</p>
                            </div>
                            <div class="row">
                                <p class="index-privacy-agreement-p about-p-h">本网站上显示的资料，为“云合同”会员之间的商业用途，并受到版权法的法律保护。未经“云合同”明确的书面同意，不得将本网站上显示的资料用于任何其它的公众商业用途。</p>
                            </div>
                            <div class="row">
                                <p class="index-privacy-agreement-p about-p-h">本网站表述的任何意见均属于作者个人意见，并不代表“云合同”、 “云合同”运营商或“云合同”关联公司的意见。</p>
                            </div>
                            <div class="row">
                                <p class="font-weight-h privacy-p-h">信息的披露和使用</p>
                            </div>
                            <div class="row">
                                <p class="index-privacy-agreement-p about-p-h">我们不会向任何无关第三方提供，出售，出租，分享和交易用户的个人信息，但为方便你使用“云合同”服务及“云合同”关联公司或其他组织的服务（以下称其他服务），你同意并授权“云合同”将你的个人信息传递给你同时接受其他服务的“云合同”关联公司或其他组织，或从为你提供其他服务的“云合同”关联公司或其他组织获取你的个人信息。</p>
                            </div>
                            <div class="row">
                                <p class="index-privacy-agreement-p about-p-h">我们会对你及（或）你的公司的身份和交易数据进行综合统计，并以“云合同”判断合理的目的和用途将该综合统计向广告主披露。但是，在这些情况下，我们不会向这些机构披露任何可能用以识别用户个人身份的资料，但从用户的用户名或其它可披露资料分析得出的资料不受此限。</p>
                            </div>
                            <div class="row">
                                <p class="index-privacy-agreement-p about-p-h">1、你同意我们可批露或使用你的个人信息以用于识别和（或）确认你的身份，或解决争议，或有助于确保网站安全、限制欺诈、非法或其他刑事犯罪活动，以执行我们的服务协议。</p>
                            </div>
                            <div class="row">
                                <p class="index-privacy-agreement-p about-p-h">2、你同意我们可批露或使用你的个人信息以保护你的生命、财产之安全或为防止严重侵害他人之合法权益或为公共利益之需要。</p>
                            </div>
                            <div class="row">
                                <p class="index-privacy-agreement-p about-p-h">3、你同意我们可批露或使用你的个人信息以改进我们的服务，并使我们的服务更能符合你的要求，从而使你在使用我们服务时得到更好的使用体验。</p>
                            </div>
                            <div class="row">
                                <p class="index-privacy-agreement-p about-p-h">4、你同意我们利用你的个人信息与你联络，并向你提供你感兴趣的信息，如：产品信息。你接受“‘云合同’注册协议”和本隐私声明即为明示同意收取这些资料。</p>
                            </div>
                            <div class="row">
                                <p class="index-privacy-agreement-p about-p-h">当我们被法律强制或依照政府或依权利人因识别涉嫌侵权行为人的要求而提供你的信息时，我们将善意地披露你的资料。</p>
                            </div>
                            <div class="row">
                                <p class="index-privacy-agreement-p about-p-h">信息的存储和交换所收集的用户信息和资料将保存在“云合同”及（或）其关联公司的服务器上。</p>
                            </div>
                            <div class="row">
                                <p class="font-weight-h privacy-p-h">保密条款</p>
                            </div>
                            <div class="row">
                                <p class="index-privacy-agreement-p about-p-h">任何人均需严格遵守安全保密条款，保护双方商业秘密及相关权益。包括但不限于产品知识产权、策划方案、客户资料、协议合同、技术文档、程序文件、程序控件或源代码、各种账户密码。任何人不得泄漏对方的任何商业秘密，同时不得利用工作之便获取对方技术秘密。对于双方授权使用的技术，只能使用于授权时指定的范围，不得用于它途。</p>
                            </div>
                            <div class="row">
                                <p class="font-weight-h privacy-p-h">安全防护</p>
                            </div>
                            <div class="row">
                                <p class="index-privacy-agreement-p about-p-h">我们网站有相应的安全措施来确保我们掌握的信息不丢失，不被滥用和变造。这些安全措施包括向其它服务器备份数据和对用户密码加密等。尽管我们有这些安全措施，但请注意在因特网上不存在“完善的安全措施”，你仍需对你的信息及交易安全保持持续充分的注意。</p>
                            </div>
                            <div class="row">
                                <p class="font-weight-h privacy-p-h">外部链接</p>
                            </div>
                            <div class="row">
                                <p class="index-privacy-agreement-p about-p-h">“云合同”含有到其他网站的链接，我们可能在任何需要的时候增加商业伙伴或共用品牌的网站。“云合同”对你通过“云合同”链接到其他网站需要的隐私保护不负任何责任。</p>
                            </div>
                            <div class="row">
                                <p class="font-weight-h privacy-p-h">法律声明</p>
                            </div>
                            <div class="row">
                                <p class="index-privacy-agreement-p about-p-h">若你访问和使用“云合同”网站，你必须不加修改地完全接受本协议中所包含的条款、条件和“云合同”网站即时刊登的通告，并且遵守有关互联网使用的相关法律及本网站的规定与规则。一旦你访问、使用了“云合同”网站，即表示你同意并接受了所有该等条款、条件及通告。</p>
                            </div>
                            <div class="row">
                                <p class="index-privacy-agreement-p about-p-h">“云合同”所有的版权权利均在全世界范围内受到法律保护，除非有其他的标注或在此等条款和规则中被允许使用，本网站上可阅读和可见的所有资料都受到知识产权法的保护。</p>
                            </div>
                            <div class="row">
                                <p class="index-privacy-agreement-p about-p-h">“云合同”拥有的所有版权和商标未经书面同意，不得以任何非法手段侵犯。对于已经授权的版权或者商标用途，只能使用于授权时指定的范围。任何人不得利用工作之便获取版权和商标。</p>
                            </div>
                            <div class="row">
                                <p class="font-weight-h privacy-p-h">免责声明</p>
                            </div>
                            <div class="row">
                                <p class="index-privacy-agreement-p about-p-h">“云合同”在此特别声明对如下事宜不承担任何法律责任：</p>
                            </div>
                            <div class="row">
                                <p class="index-privacy-agreement-p about-p-h">1、“云合同”特别声明，对你使用本网站及与本网站相关的任何内容、服务或其它链接至本网站的站点、内容，“云合同”均不作直接、间接、法定、约定的保证。</p>
                            </div>
                            <div class="row">
                                <p class="index-privacy-agreement-p about-p-h">2、 无论在任何原因下（包括但不限于疏忽原因），对你或任何人通过使用本网站上的信息或由本网站链接的信息，或其他与本网站链接的网站信息所导致的损失或损害（包括直接、间接、特别或后果性的损失或损害，例如收入或利润之损失，电脑系统之损坏或数据丢失等后果），责任均由使用者自行承担（包括但不限于疏忽责任）</p>
                            </div>
                            <div class="row">
                                <p class="index-privacy-agreement-p about-p-h">使用者对本网站的使用即表明同意承担浏览本网站的全部风险，“云合同”、 “云合同”运营商或“云合同”关联公司对使用者在本网站存取资料所导致的任何直接、间接的，后果性的或金钱上的损失不承担任何责任。</p>
                            </div>
                            <br/>
                            <br/>
                            <div class="row">
                                <p class="index-privacy-agreement-p3">联系我们</p>
                            </div>
                            <div class="row">
                                <p class="index-privacy-agreement-p3">如果你对本隐私声明或云的隐私保护措施以及你在使用中的问题有任何意见和建议请和我们联系：</p>
                            </div>
                            <div class="row">
                                <p class="index-privacy-agreement-p3"><a class="" href="/">www.yunhetong.com</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { mapState } from 'vuex'
import base from '~/framework/core/vue-base.vue'
import apis from '~/config/api'
import { asyncLoadJsFile, asyncLoadCssFile } from  '~/framework/core/utils'
import xss from 'xss'
import * as types from '~/store/mutation-types'


export default {
    name: 'privacy-agreement',
    extends: base,
    metaInfo: {
        title: '隐私声明—云合同'
    },
    layout: 'normal',
    data () {
        return {
            type: '',
            navText: ''
        }
    },
    created () {
        this.init()
    },
    computed: {
        ...mapState({
        })
    },
    watch: {
    },
    mounted () {


    },
    methods: {
        init () {
            this.type = this.$route.query.type || '1'
            this.navText = (this.type === '1' ? '注册协议' : '隐私声明')
        },
        onSwitchTab (type) {
            this.type = type
            this.navText = (this.type === '1' ? '注册协议' : '隐私声明')
        }
    },
    components: {
    }

}
</script>

<style lang="scss"  scoped >
@import "~styles/base.scss";
.lx-privacy-agreement{
    @include responsive-default {
        margin-top: 67px;
        background-color: #f5f6fa;
        .about-bg-h{
            .public-margin-h{
                margin: 20px 0;
            }
            .content{
                padding: 50px 15px 20px;
                margin-bottom: 30px;
                background-color: #fff;
                .footer-mar-bottom-h{
                    margin-bottom: 0;
                    .nav-tabs-privacy-h{
                        margin-bottom: 30px;
                        li{
                            font-size: 18px;
                            border: 1px solid #dadada;
                            a{
                                color: #000;
                                padding: 5px 0;
                                width: 100%;
                                &:hover{
                                    background: #fff;
                                    color: #4081ff;
                                }
                            }
                            &:hover{
                                cursor: pointer;
                            }

                        }
                        .active{
                            color: #4081ff;
                            background-color: #fff;
                        }
                    }
                    .font-weight-h{
                        font-weight: 600;
                    }
                }
                .tab-content{
                    .tab-pane{
                        display: none;
                        visibility: hidden;
                    }
                    .active{
                        display: block;
                        visibility: visible;
                    }
                    .privacy-p-h{
                        margin-bottom: 0;
                        line-height: 1.5;
                    }
                    .about-p-h{
                        text-indent: 2em;
                    }
                    .font-weight-h{
                        font-weight: 600;
                    }
                    .index-privacy-agreement-p{
                        color: #606060;
                        margin-bottom: 0;
                        line-height: 1.5;
                    }
                    .index-privacy-agreement-p1{
                        color: #f8b62c;
                        margin-bottom: 10px;
                        line-height: 1.5;
                    }
                    .index-privacy-agreement-p3{
                        color: #1560ad;
                        margin-bottom: 0;
                        line-height: 1.5;
                    }
                }
            }
        }

    }

}
</style>
